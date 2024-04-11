const express = require('express');
const router = express.Router();

//Controllers
const user = require('../controllers/userController');
const login = require('../controllers/loginController');
const course = require('../controllers/courseController');
const admin = require('../controllers/adminController')
const subscription = require('../controllers/subscriptionController')

// Middle token
const {checkAuth} = require('../helpers/middleToken')
const checkRoleAuth = require('../helpers/roleAuth')

//Validators
const { validateCreateUser, validateEditUser } = require('../validators/users')
const { validateCreateCourse, validateEditCourse } = require('../validators/courses')

//Multer
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    // Generar un nombre único para el archivo
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });



//RUTA RAIZ
router.get("/", (req,res) =>{
    res.render('index');
})

//RUTA PARA LOGIN
router.get("/login", login.login);
router.post("/login/auth", login.auth); 
router.get("/logout", login.logout);




//RUTAS PARA USUARIO
router.get("/users/create", user.create); //Registro de usuarios
router.post("/users/store", validateCreateUser, user.store);
router.get("/users/edit/:id", user.edit); //Ruta para que los usuarios puedan modificar los datos
router.post("/users/update/:id", validateEditUser, user.update);

router.get("/users/lista/compras", checkAuth, user.compras);
router.get("/users/lista/suscripciones", user.suscripciones);



//RUTAS PARA CURSOS
router.get("/courses/show",checkAuth ,course.show); //Ruta para que todos puedan ver los cursos -
router.get("/courses/show/:id",checkAuth, course.showCourse) //Ruta para ver los detalles de un curso en especifico
router.get("/courses/show/videos/:id",checkAuth, course.showVideo) //Ruta para ver los detalles de un curso en especifico


//RUTAS PARA PAGOS
/*SUSCRIPCIONES*/
router.post("/checkout-session/basico", subscription.basicSub);
router.post("/checkout-session/medio", subscription.mediumSub);
router.post("/checkout-session/premium", subscription.premiumSub);
router.get("/subscription/success/:id", subscription.success);
router.get("/cancel", subscription.cancel);

/*COMRPAS*/
router.post("/checkout-session/purchase/:id", subscription.purchase);
router.get("/purchase/success/:id", subscription.successPurchase);

/*RECLAMACIONES*/
router.get("/reclamar/curso/:id", subscription.reclamar);



//RUTAS ADMIN
router.get("/users/show", checkAuth, checkRoleAuth([1]), user.show); //Ver lista de usuarios
router.post("/users/destroy/:id", checkAuth, checkRoleAuth([1]), user.destroy); //Ruta para que el admin pueda borrar usuarios

router.get("/admin/courses", checkAuth, checkRoleAuth([1]), admin.show); //Ver cursos añadidos(En esta ruta el admin podra administrar los cursos)
router.get("/courses/create", checkAuth, checkRoleAuth([1]), course.create); //Ruta para crear un nuevo curso
router.post("/courses/store", upload.fields([{ name: 'videos', maxCount: 5 }, { name: 'imagenes', maxCount: 5 }]), checkAuth, checkRoleAuth([1]), validateCreateCourse, course.store);
router.get("/courses/edit/:id", checkAuth, checkRoleAuth([1]), course.edit); //Ruta para editar un curso existente
router.post("/courses/update/:id", upload.fields([{ name: 'videos', maxCount: 5 }, { name: 'imagenes', maxCount: 5 }]), checkAuth, checkRoleAuth([1]), validateEditCourse, course.update);
router.get("/courses/destroy/:id", checkAuth, checkRoleAuth([1]), course.destroy); //Ruta para eliminar cursos

router.get("/logs", checkAuth, checkRoleAuth([1]), admin.logs); //Ver lista de usuarios

//
module.exports = router;