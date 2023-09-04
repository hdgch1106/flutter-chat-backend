/*
path: /api/login
*/
const {Router} = require("express");
const { check } = require("express-validator");
const { crearUsuario, loginUsuario, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.post("/new", [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validarCampos
], crearUsuario);

router.post("/", [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validarCampos
], loginUsuario);

router.get("/renew", validarJWT , renewToken);

module.exports = router;