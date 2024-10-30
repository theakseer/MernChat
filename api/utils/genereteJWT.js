import jsonwebtoken from "jsonwebtoken";

const generateAccessToken = (userId, res) => {
const accessToken = jsonwebtoken.sign({userId}, process.env.JWT_SECRET_KEY,{
    expiresIn:'15d'
})

res.cookie("jwt",accessToken,{
    maxAge:15*24*60*60*1000, //milliseconds
    httpOnly:true,
    sameSite:"strict",
    secure:process.env.NODE_ENV !== 'development' ,
})
}
export default generateAccessToken;