const passport = require('passport');
const nodemailer=require('nodemailer')
exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
}
exports.cookieExtractor=function(req){
  let token=null
  // console.log(req.cookies)
  if(req && req.cookies){
    token=req.cookies['jwt']
  }
  return token
}
let transporter=nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:587,
  secure:false,
  auth:{
    user:"akankit3020@gmail.com",
    pass:process.env.PASSWORD
  }
})
exports.sendMail=async function({to,subject,text,html}){
    let info=await transporter.sendMail({
      from:'"E-commerce" <akankit3020@gmail.com>',
      to,
      subject,
      text,
      html
    })
    return info
}