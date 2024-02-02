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


router.get("/user/:id", async (req, res) => {
    const _id = req.params.id;
    const user = await userController.getById(_id);
    if(!user) {
      return res.send({
        message: "User not Found!"
      })
    }
    res.send(user);
  });


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

router.put('/reset-password',async(req,res)=>{
    let payload ={
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