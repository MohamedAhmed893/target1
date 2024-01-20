import express from "express"
import userController from "../controllers/user.js"
const router = new express.Router()

router.post('/signup',async(req,res)=>{
    let payload ={
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password,
        confirmedPassword:req.body.confirmedPassword,
        role:req.body.role
    }
    const result =await userController.signUp(payload)
    if(result.value) {
        return res.send(result.value)
    }
    res.status(result.statusCode).send({
        message: result.message
    })
})


router.post('/signin',async(req,res)=>{
    const payload ={
        email:req.body.email,
        password:req.body.password
    }
    const result = await userController.signin(payload)
    if(result.value) {
        return res.send(result.value)
    }
    res.status(result.statusCode).send({
        message: result.message
    })
})
router.post('/forgetpassword',async(req,res)=>{
    console.log("tsss")
    let payload ={
        email:req.body.email
    }
    const result =await userController.frogetPassword(payload)
    if(result.value) {
        return res.send(result.value)
    }
    res.status(result.statusCode).send({
        message: result.message
    })
})

router.post('/reset-password',async(req,res)=>{
    let payload ={
        //na 4aka fe 7war el email 7asah momken yeb2a params
        // etracyyyyyyyyyyyyyyyyy el sob7 el 8alta hena at2reban
        email:req.body.email,
        otp:req.body.otp,
        password:req.body.password,
        confirmedPassword:req.body.confirmedPassword

    }
    const result =await userController.resetPassword(payload)
    if(result.value) {
        return res.send(result.value)
    }
    res.status(result.statusCode).send({
        message: result.message
    })
})
export default router