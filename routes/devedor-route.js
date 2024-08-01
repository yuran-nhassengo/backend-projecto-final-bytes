const express = require("express");

const router = express.Router();

const {getAllDevedor,getDevedor,signupDevedor,login,updateDevedor} = require("../controller/devedor-controller");



router.get("/devedor",getAllDevedor);

router.get("/devedor/:id", getDevedor);

router.post("/auth/signup",signupDevedor);

router.put("/auth/update/:id",updateDevedor);

router.post("/auth/login",login);

module.exports = router;