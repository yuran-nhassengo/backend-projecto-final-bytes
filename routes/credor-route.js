const express = require("express");

const router = express.Router();

const {getAllCredor,getCredor,signupCredor,login,updateCredor,deleteCredor} = require("../controller/credor-controller");



router.get("/credor",getAllCredor);

router.get("/credor/:id", getCredor);

router.post("/credor/signup",signupCredor);

router.put("/credor/update/:id",updateCredor);

router.delete("/credor/delete/:id",deleteCredor);

router.post("/credor/login",login);

module.exports = router;