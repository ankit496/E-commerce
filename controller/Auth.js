const { User } = require('../models/User');
const crypto = require('crypto');
const { sanitizeUser, sendMail } = require('../services/common');
const SECRET_KEY = process.env.SECRET;
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();

        req.login(sanitizeUser(doc), (err) => {
          // this also calls serializer and adds to session
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
            res.cookie('jwt', token, {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true,
            })
            res.status(201)
            res.json({ id: doc.id, role: doc.role });
          }
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  const user = req.user
  res.cookie("jwt", user.token, {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
  })
  res.status(201).json({ id: user.id, role: user.role });
};
exports.logout = async (req, res) => {
  
  res.cookie("jwt", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  res.status(200).json("ok")
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
exports.resetPasswordRequest = async (req, res) => {
  const email = req.body.email
  const user = await User.findOne({ email: email })
  if (user) {
    const token = crypto.randomBytes(48).toString('hex')
    await User.findOneAndUpdate({ email: email }, { resetPasswordToken: token })
    const resetPageLink = "http://localhost:8000/reset-password?token=" + token + '&email=' + email
    const subject = "reset password for e-commerce"
    const html = `<p>Click <a href=${resetPageLink}>here</a> to Reset Password</p>`
    if (email) {
      const response = await sendMail({ to: email, subject, html })
      res.status(200).json(response)
    }
    else
      res.sendStatus(400)
  }
  else {
    res.status(404).json("User not found")
  }
}
exports.resetPassword = async (req, res) => {
  const { email, password, token } = req.body

  const user = await User.findOne({ email: email, resetPasswordToken: token })
  if (user) {
    const salt = crypto.randomBytes(16);
    try {
      crypto.pbkdf2(
        password,
        salt,
        310000,
        32,
        'sha256',
        async function (err, hashedPassword) {
          const user = await User.findOneAndUpdate({email:email,resetPasswordToken:token},{password:hashedPassword,salt:salt});
        })
      console.log('password reset')
      res.status(204).json('password reset')
    } catch (err) {
      res.status(400).json(err);
    }
  }
  else {
    res.status(404).json("User not found")
  }
}