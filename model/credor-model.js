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
    email: {
        type: String,
        required: true
    },
    confirmSenha: {
        type: String,
        required: true
    },
    devedorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Devedor'
      },
      tipoConta: { type: String, default: 'credor'}
});


const ofertaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
    },
    descricao: {
        type: String,
        required: true,
    },
    credorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Credor', 
    }
}, {
    timestamps: true,
});


const Credor = mongoose.model('Credor', credorSchema);
const  Oferta =mongoose.model("Oferta",ofertaSchema);

module.exports = {
    Credor,
    Oferta
};






