const asyncHandler = require('express-async-handler');
const devedorModel = require("../model/devedor-model");
const {default:mongoose} = require("mongoose");
const jwt = require('jsonwebtoken');


    const authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; 

        if (token == null) return res.sendStatus(401); 

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) return res.sendStatus(403); 
            req.user = user; 
            next(); 
        });
    };

const generateToken = (userId) => {
    const secret = process.env.SECRET ; 
    const options = { expiresIn: '1h' }; 
    return jwt.sign({ id: userId }, secret, options);
};

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
    console.log('Requisição para /get-devedor');

    const userid = req.user.id;

    console.log('ID do usuário:', userid);
        
    if (!mongoose.Types.ObjectId.isValid(userid)) {
        console.log('ID inválido');
        return res.status(404).json({ message: "Devedor não encontrado" });
    }

    const devedor = await devedorModel.findById(userid);
    

    try{
        if(!devedor){
            console.log('Devedor não encontrado');
            res.status(404).json({message:"Devedor não encontrado"});
      
            }
        
        
            res.status(200).json({data:devedor});

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

   



const updateDevedor = asyncHandler(async (req, res) => {
    const userid = req.user.id;

    console.log('ID do usuário put:', userid);

    if (!userid) {
        return res.status(400).json({ message: "Por favor introduza o Id." });
    }

    const devedor = await devedorModel.findById(userid);
    if (!devedor) {
        return res.status(404).json({ message: "Devedor não encontrado." });
    }

    try {
        const updateDevedor = { ...req.body };

        delete updateDevedor.senha;

        const updatedDevedor = await devedorModel.findByIdAndUpdate(userid,updateDevedor, { new: true});

        res.status(200).json({ message: "Devedor atualizado com sucesso!", devedor: updateDevedor });
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

    module.exports = {getAllDevedor,getDevedor,signupDevedor,login,updateDevedor,deleteDevedor,authenticateToken}