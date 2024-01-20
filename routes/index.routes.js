import { globalError } from "../middleware/globalError.js"
import { AppError } from "../utils/AppError.js"
//import cartRouter from './cart.js'
import  router from "../routes/user.js"
export const apiRoutes =(app)=>{


    app.use(router)
   

    //------------------------------
    app.use('*',(req,res,next)=>{
        next(new AppError("Page Not Found "+req.originalUrl,404))
    })
    app.use(globalError)
}