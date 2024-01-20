import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

function generateToken(user) {
    const token = jwt.sign({
        id:user.id, 
        email:user.email,
        fullName:user.fullName,
        role:user.role
    }, process.env.SECRET , {
        expiresIn:'24h'
    })
    user.token = token
    console.log(user.token)
}
function validPassword(password){
    const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if(!password.match(regex)){
        console.log('password not match')
        return false
    }
    console.log('password match',password)
    return true
}
function validEmail(email){
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        console.log('email  match')
        return false
    }
    console.log('email match')
    return true
}
function ecncryptPassword(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}
async function comparePassword(password,tobeMatched){
    const result= await bcrypt.compare(password,tobeMatched)
    console.log(result)
    return result
}
export default 
{
    validEmail,
    validPassword,
    comparePassword,
    ecncryptPassword,
    generateToken
}