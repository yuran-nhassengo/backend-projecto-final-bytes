const asyncHandler = require('express-async-handler');
const devedorModel = require("../model/devedor-model");
const {default:mongoose} = require("mongoose");
const jwt = require('jsonwebtoken');

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

            const {name
                ,bi
                ,data
                ,genero
                ,profissao
                ,contacto
                ,email
                ,endereco
                ,senha
                ,confirmSenha} = req.body;


        try{
        const devedorExist = await devedorModel.findOne({email});

        const formattedDate = new Date(data);

        if (isNaN(formattedDate.getTime())) {
            return res.status(400).json({ message: "Data inválida." });
        }

        if(!formattedDate){
            
            console.log(name)
            return  res.status(400).json({message: "Bi invalido."});
        }

        if(!name || !bi || !data || !genero || !profissao || !contacto || !email || !endereco || !senha || !confirmSenha){
            
            console.log(name)
            return  res.status(400).json({message: "Os dados introduzidos não são válidos."});
        }

        if(devedorExist){

        return  res.status(400).json({errors: "O endereço já está registado com uma outra conta."});
        }

        if(senha != confirmSenha){
            return  res.status(400).json({errors: "As passwords não coincidem."});
        }

        const devedor = await devedorModel.create({
            name,
            bi,
            data:formattedDate,
            genero,
            profissao,
            contacto,
            email,
            endereco,
            senha,
            confirmSenha
        });

        res.status(201).json({ message: "Devedor criado com sucesso!", _id: devedor._id });

        }catch (err){
            console.error(err);
            res.status(400).json({err: "Internal Server error."});
        }

       });

       const login = asyncHandler(async (req, res) => {

        const {email,senha} = req.body;

        try{

            const devedorExist = await devedorModel.findOne({email}); 
            const {senha:senhaC,name} = devedorExist

            if(!devedorExist){

                return  res.status(404).json({"message": "O Devedor não foi encontrado!"});
             }


             if(senha != senhaC){

                return  res.status(401).json({ "message": "A password introduzida é inválida!"});
             }

             const token = generateToken(devedorExist._id);

             console.log(name);
        
             return  res.status(200).json({message: `Bem vindo!,${name}`,token: token});


        }catch(err){
            console.error(err);
            res.status(400).json({err: "Internal Server error."});
        }

    });

    const generateToken = (userId) => {
        const secret = process.env.SECRET ; 
        const options = { expiresIn: '1h' }; 
        return jwt.sign({ id: userId }, secret, options);
    };



const updateDevedor = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Por favor introduza o Id." });
    }

    const devedor = await devedorModel.findById(id);
    if (!devedor) {
        return res.status(404).json({ message: "Devedor não encontrado." });
    }

    try {

        const novoDevedor = {
            ...devedor.doc,
            ...req.body
        }
        const updatedDevedor = await devedorModel.findByIdAndUpdate(id,novoDevedor, { new: true});

        res.status(200).json({ message: "Devedor atualizado com sucesso!", devedor: novoDevedor });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Erro interno do servidor." }); 
    }
});

const deleteDevedor = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Por favor, introduza o id do devedor." });
    }

    try {
        const devedor = await devedorModel.findByIdAndDelete(id);

        if (!devedor) {
            return res.status(404).json({ message: "Devedor não encontrado." });
        }

      
        res.status(200).json({ message: "Devedor deletado com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});

    module.exports = {getAllDevedor,getDevedor,signupDevedor,login,updateDevedor,deleteDevedor}