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




