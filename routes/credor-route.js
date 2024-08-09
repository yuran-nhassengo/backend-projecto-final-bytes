const express = require("express");

const router = express.Router();

const {listarDevedoresPorCredorId,getAllOfertas,createOferta,listarDevedoresPorCredor,getCredorById,signupCredor,getAllCredor,getCredor,deleteCredor,updateCredor,getCredorByDevedorId,login,
    authenticateToken} = require("../controller/credor-controller");



router.get("/credores",getAllCredor);

router.get('/credor/:devedorId',getCredorByDevedorId);

router.get("/credor",authenticateToken, getCredor);

router.post("/credor/oferta",authenticateToken,createOferta);

router.get("/credores/oferta",getAllOfertas );

router.get("/credorid/:id",getCredorById);

router.get("/credores/emprestimo",authenticateToken,listarDevedoresPorCredor);

router.get("/credores/emprestimo/:id",listarDevedoresPorCredorId);

router.post("/credor/signup",signupCredor);

router.put("/credor/update/",authenticateToken,updateCredor);

router.delete("/credor/delete/:id",deleteCredor);



module.exports = router;