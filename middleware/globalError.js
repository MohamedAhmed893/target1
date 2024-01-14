export const globalError =()=>{
    (err,req,res,next)=>{
        let code =err.StatusCode || 403
        res.status(code).json({Error:err.message})
    }
}