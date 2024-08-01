const asyncHandler = require('express-async-handler');
const devedorModel = require("../model/devedor-model");
const {default:mongoose} = require("mongoose");

const getAllDevedor = asyncHandler(async (req,res) =>{
    const devedores = await devedorModel.find();

    const usData = devedores.map(devedor =>{
        return {
            id: devedor._id,
            name: devedor.name,
            email:devedor.email,
            data:devedor.data,
            genero:devedor.genero,
            contacto:devedor.contacto,
            endereco:devedor.endereco
        }
    });

    res.status(200).json({data:usData})
});

const getDevedor = asyncHandler ( async(req, res) => {

        
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: "Devedor não encontrado" });
    }

    const devedor = await devedorModel.findById(req.params.id)
    

    try{
        if(!devedor){

            res.status(404).json({message:"Devedor não encontrado"});
      
            }
        
            const {_id,
                    name,
                    email,
                    profissao,
                    data,
                    genero,
                    endereco,
                    contacto} = devedor
        
            res.status(200).json({_id,name,email,profissao,data,genero,contacto});

    }catch(err){
        res.status(400).json({err: "Internal Server error."});
    }
});


        const signupDevedor = asyncHandler(async (req, res) => {

            const {name,bi,data,genero,profissao,contacto,email,senha,confirmSenha} = req.body;


        try{
        const devedorExist = await devedorModel.findOne({email});

        if(!name || !bi || !data || !genero || !profissao || !contacto || !email || !password || !password){
            return  res.status(400).json({message: "Os dados introduzidos não são válidos."});
        }

        if(devedorExist){

        return  res.status(400).json({errors: "O endereço já está registado com uma outra conta."});
        }

        if(password != passwordConfirmation){
            return  res.status(400).json({errors: "As passwords não coincidem."});
        }

        const devedor = await devedorModel.create({
            name,
            bi,
            data,
            genero,
            profissao,
            contacto,
            email,
            senha,
            confirmSenha
        });

        res.status(201).json({ message: "Devedor criado com sucesso!", _id: user._id });

        }catch (err){

            res.status(400).json({err: "Internal Server error."});
        }

       });