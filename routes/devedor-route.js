const express = require("express");

const router = express.Router();

const {getAllDevedor,getDevedor,signupDevedor,login,updateDevedor,deleteDevedor} = require("../controller/devedor-controller");



router.get("/devedor",getAllDevedor);

router.get("/devedor/:id", getDevedor);

router.post("/devedor/signup",signupDevedor);

router.put("/devedor/update/:id",updateDevedor);

router.delete("/devedor/delete/:id",deleteDevedor);

router.post("/devedor/login",login);

module.exports = router;