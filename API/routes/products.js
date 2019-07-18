const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../Auth/check-auth');

const ProductController = require('../contollers/products');

const storage = multer.diskStorage({
   destination: function (req, file,cb) {
       cb(null, './uploads');
   },
   filename: function (req,file, cb) {
       cb(null, new Date().toDateString() + file.originalname);
   }
});

//rejecting a file
const fileFilter =  function(req,file,cb) {
    if (file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ) {
        cb(null, true);
    } else{
        cb(new Error('Image Extension rejected try(jpg,jpeg,png)'),false)
    }
};

const upload = multer({
    storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter
});




router.get('/',checkAuth, ProductController.Get_All_Products);

router.post("/", checkAuth ,upload.single('productImage'), ProductController.Create_Product) ;

router.get("/:productId", checkAuth, ProductController.Get_Product) ;

router.patch('/:productId',checkAuth, ProductController.Update_Product );

router.delete('/:productId', checkAuth,ProductController.Delete_Product );


module.exports = router;