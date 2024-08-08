const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Credor = require('../model/credor-model');
const Devedor = require('../model/devedor-model');
const { authenticateToken } = require('../controller/devedor-controller'); 

const generateToken = (userId, tipo) => {
    const secret = process.env.SECRET;
    const options = { expiresIn: '1h' };
    return jwt.sign({ id: userId, tipo: tipo }, secret, options);
};


router.post('/user/switch', authenticateToken, async (req, res) => {
    const { userId, tipoConta } = req.body;

    if (!userId || !tipoConta) {
        return res.status(400).json({ message: 'Parâmetros inválidos.' });
    }

    try {
        let user;
        if (tipoConta === 'credor') {
            user = await Credor.findById(userId);
        } else if (tipoConta === 'devedor') {
            user = await Devedor.findById(userId);
        } else {
            return res.status(400).json({ message: 'Tipo de conta inválido.' });
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        
        const token = generateToken(user._id, tipoConta);
        res.json({ token });

       

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});





module.exports = router;
