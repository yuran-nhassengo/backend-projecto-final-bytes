const express = require("express");

const router = express.Router();

const {signupCredor,getAllCredor,getCredor,deleteCredor,updateCredor,getCredorByDevedorId } = require("../controller/credor-controller");



router.get("/credor",getAllCredor);

router.get('/credor/:devedorId',getCredorByDevedorId);

router.get("/credor/:id", getCredor);

router.post("/credor/signup",signupCredor);

router.put("/credor/update/:id",updateCredor);

router.delete("/credor/delete/:id",deleteCredor);


module.exports = router;