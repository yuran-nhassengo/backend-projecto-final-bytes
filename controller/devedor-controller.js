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
            contacto:devedor.contacto
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
                    contacto} = user
        
            res.status(200).json({_id,name,email,profissao,data,genero,contacto});

    }catch(err){
        res.status(400).json({err: "Internal Server error."});
    }
});



