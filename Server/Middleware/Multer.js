import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req ,file, cb) {
        cb(null , "D:/MERN-Stack-JWT-Authentication/Server/public/assets");
    },
    filename : function (req,file,cb) {
        cb(null , file.originalname);
    },
});

const upload = multer({storage});

export default upload;