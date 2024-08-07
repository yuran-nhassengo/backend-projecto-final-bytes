const express = require("express");

const router = express.Router();

const {authenticateToken,getAllDevedor,getDevedor,signupDevedor,updateDevedor,deleteDevedor,login,criarEmprestimo ,listarEmprestimos} = require("../controller/devedor-controller");



router.get("/devedores",getAllDevedor);


router.get('/get-devedor', authenticateToken, (req, res, next) => {
    console.log('Requisição recebida em /get-devedor');
    next();
}, getDevedor);

router.post("/devedor/signup",signupDevedor);

router.put("/devedor/update",authenticateToken,updateDevedor);

router.delete("/devedor/delete/:id",deleteDevedor);

router.post("/devedor/login",login);

router.post('/emprestimos', authenticateToken, criarEmprestimo); 
router.get('/emprestimos', listarEmprestimos); 


module.exports = router;