const mongoose = require('mongoose');

const credorSchema = new mongoose.Schema({
    nomeEmpresa: {
        type: String,
        required: true
    },
    nuit: {
        type: String,
        required: true,
    },
    endereco: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    confirmSenha: {
        type: String,
        required: true
    },
    devedorId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Credor', credorSchema);

