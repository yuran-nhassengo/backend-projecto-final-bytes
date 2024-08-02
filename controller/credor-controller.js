const asyncHandler = require('express-async-handler');
const Credor = require('../models/credor-model'); 

const signupCredor = asyncHandler(async (req, res) => {
    const { nomeEmpresa, nuit, endereco, senha, confirmSenha } = req.body;

    try {
       
        if (!nomeEmpresa || !nuit || !endereco || !senha || !confirmSenha) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        
        if (senha !== confirmSenha) {
            return res.status(400).json({ errors: "As senhas não coincidem." });
        }

       
        const credorExist = await Credor.findOne({ nuit });
        if (credorExist) {
            return res.status(400).json({ errors: "O NUIT já está registrado com outra conta." });
        }

      
        const credor = await Credor.create({
            nomeEmpresa,
            nuit,
            endereco,
            senha, 
            confirmSenha 
        });


        res.status(201).json({ message: "Credor criado com sucesso!", _id: credor._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});

module.exports = {signupCredor}

