const asyncHandler = require('express-async-handler');
const Credor = require('../model/credor-model'); 
const Devedor = require('../model/devedor-model');
const jwt = require('jsonwebtoken');
const {default:mongoose} = require("mongoose");
      

const generateToken = (userId, tipo) => {
    const secret = process.env.SECRET; 
    const options = { expiresIn: '1h' }; 
    return jwt.sign({ id: userId, tipo: tipo }, secret, options);
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user; 
        next(); 
    });
};

const login = asyncHandler(async (req, res) => {
    const { email, senha } = req.body;

    try {
        const credorExist = await Credor.findOne({ email });
        if (!credorExist) {
            return res.status(404).json({ message: "Credor não encontrado!" });
        }

        if (senha !== credorExist.senha) {
            return res.status(401).json({ message: "Senha inválida!" });
        }

       
        const token = generateToken(credorExist._id, credorExist.tipoConta);

        return res.status(200).json({ message: `Bem-vindo, ${credorExist.nomeEmpresa}!`, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});

const signupCredor = asyncHandler(async (req, res) => {
    const { nome, nuit, endereco, senha, confirmSenha,email, devedorId } = req.body;

    try {
       

        if (!nome || !nuit || !endereco || !senha || !email || !confirmSenha || !devedorId) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        if (senha !== confirmSenha) {
            return res.status(400).json({ errors: "As senhas não coincidem." });
        }

        const credorExist = await Credor.findOne({ nuit });
        if (credorExist) {
            return res.status(400).json({ errors: "O NUIT já está registrado com outra conta." });
        }

        if (!mongoose.Types.ObjectId.isValid(devedorId)) {
            return res.status(400).json({ message: "ID do devedor inválido." });
        }

        const devedorExist = await Devedor.findById(devedorId);
        if (!devedorExist) {
            return res.status(404).json({ message: "Devedor não encontrado." });
        }

        const credor = await Credor.create({
            nomeEmpresa: nome,
            nuit,
            endereco,
            senha,
            email,
            confirmSenha, 
            devedorId 
        });

        res.status(201).json({ message: "Credor criado com sucesso!", _id: credor._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});


const getAllCredor = asyncHandler(async (req, res) => {
    try {
        
        const credores = await Credor.find();

        
        const credorData = credores.map(credor => {
            return {
                id: credor._id,
                nomeEmpresa: credor.nomeEmpresa,
                nuit: credor.nuit,
                endereco: credor.endereco,
            };
        });

        
        res.status(200).json({ data: credorData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno do servidor." }); 
    }
});

const getCredorByDevedorId = asyncHandler(async (req, res) => {
    try {
        const { devedorId } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(devedorId)) {
            return res.status(400).json({ message: "ID do devedor inválido." });
        }

        
        const credores = await Credor.find({ devedorId },'nomeEmpresa');

        if (credores.length === 0) {
            return res.status(404).json({ message: "Nenhum credor encontrado para o ID fornecido." });
        }

        res.status(200).json(credores);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});


const getCredor = asyncHandler(async (req, res) => {
   
    const userid = req.user.id;

   
    if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(404).json({ message: "Credor não encontrado" });
    }

    try {
       
        const credor = await Credor.findById(userid);

        if (!credor) {
            return res.status(404).json({ message: "Credor não encontrado" });
        }

       
        const { _id, nomeEmpresa, nuit, endereco } = credor;

        res.status(200).json({ _id, nomeEmpresa, nuit, endereco });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Erro interno do servidor." }); 
    }
});



const updateCredor = asyncHandler(async (req, res) => {

    const userid = req.user.id;

   
    if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(404).json({ message: "Credor não encontrado" });
    }

    try {
       
        const credor = await Credor.findById(userid);


        const updateCredor = { ...req.body };

        delete updateCredor.senha;

       

        if (!credor) {
            return res.status(404).json({ message: "Credor não encontrado." });
        }

        const updatedCredor = await Credor.findByIdAndUpdate(userid, updateCredor, { new: true});

       
        res.status(200).json({ message: "Credor atualizado com sucesso!", credor: updateCredor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});


const deleteCredor = asyncHandler(async (req, res) => {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Credor não encontrado" });
    }

    try {
      
        const credor = await Credor.findByIdAndDelete(id);

        if (!credor) {
            return res.status(404).json({ message: "Credor não encontrado." });
        }

       
        res.status(200).json({ message: "Credor deletado com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});




module.exports = {signupCredor,getAllCredor,getCredor,deleteCredor,updateCredor,getCredorByDevedorId,login,authenticateToken}

