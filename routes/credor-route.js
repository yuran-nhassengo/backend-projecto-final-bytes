const express = require("express");

const router = express.Router();

const {getCredorById,signupCredor,getAllCredor,getCredor,deleteCredor,updateCredor,getCredorByDevedorId,login,
    authenticateToken} = require("../controller/credor-controller");



router.get("/credores",getAllCredor);

router.get('/credor/:devedorId',getCredorByDevedorId);

router.get("/credor",authenticateToken, getCredor);

router.get("/credorid/:id",getCredorById);

router.post("/credor/signup",signupCredor);

router.put("/credor/update/",authenticateToken,updateCredor);

router.delete("/credor/delete/:id",deleteCredor);



module.exports = router;