import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { AppError } from "../utils/AppError.js";

let options =(folderName)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {

            cb(null, uuidv4() + '-' + file.originalname)
        }
    })
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)

        } else {
            cb(new AppError('images only'))

        }


    }
    return multer({ storage , fileFilter })
}
export const uploadFile = (fieldName, folderName) =>options(folderName).single(fieldName)

export const uploadMixOfFile = (arrayOfFields, folderName) => options(folderName).fields(arrayOfFields)
    
