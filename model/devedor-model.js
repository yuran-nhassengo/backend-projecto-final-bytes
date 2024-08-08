const mongoose = require("mongoose");


const devedorShema = mongoose.Schema(

    {
        name:{
            type: String,
            required: [true,"Por favor, introduza o seu nome"],
        },
        bi:{
            type: String,
            required: [true,"Por favor, introduza o numero de Bilhete de Identidade"],
        },
        data:{
            type: Date,
            required: [true,"Por favor, introduza a sua data de nascimento"],
        },
        genero:{
            type: String,
            required: [true,"Por favor, escolha um genero"],
        },
        profissao:{
            type: String,
            required: [true,"Por favor, introduza a sua profissao"],
        },
        
        contacto:{
            type: String,
            required: [true,"Por favor, introduza o seu contacto"],
        },
        email:{
            type: String,
            required: [true,"Por favor, introduza o seu Email"],
        },
        endereco:{
            type: String,
            required: [true,"Por favor, introduza o seu Endereco"],
        },
        senha:{
            type: String,
            required: [true,"Por favor, introduza o seu Email"],
        },
        confirmSenha:{
            type: String,
            required: [true,"Por favor, introduza o seu Email"],
        },
        tipoConta: { type: String, default: 'devedor'}
    }
);

const emprestimoSchema = new mongoose.Schema({
    credorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Credor' 
    },
    devedorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Devedor' 
    },
    motivo: {
        type: String,
        required: true
    },
    dataDevolucao: {
        type: Date,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default:'pendente'
    },
    juris: {
        type: Number,
        default:0
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});


const Emprestimo = mongoose.model('Emprestimo', emprestimoSchema);
const  devedorModel =mongoose.model("devedorModel",devedorShema);

module.exports = {
    devedorModel,
    Emprestimo
};


