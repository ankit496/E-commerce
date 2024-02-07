const passport = require('passport');

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
}
exports.cookieExtractor=function(req){
  let token=null
  if(req && req.cookies){
    token=req.cookies['jwt']
  }
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzFjMGMyYTMzNThkY2ExY2IzNTQ3NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA3MzE3NDQwfQ.vnjt31cbNqt59Ksz70bJCQyZveUmyd1vQarXRLzsQsA"
  return token
}