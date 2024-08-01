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
            type: String,
            required: [true,"Por favor, introduza a sua data de nascimento"],
        },
        profissao:{
            type: String,
            required: [true,"Por favor, introduza a sua profissao"],
        },
        genero:{
            type: String,
            required: [true,"Por favor, escolha um genero"],
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
            required: [true,"Por favor, introduza o seu Email"],
        },
        senha:{
            type: String,
            required: [true,"Por favor, introduza o seu Email"],
        },
        confirmSenha:{
            type: String,
            required: [true,"Por favor, introduza o seu Email"],
        },
    }
)