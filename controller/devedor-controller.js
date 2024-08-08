const asyncHandler = require('express-async-handler');
const {Emprestimo,devedorModel} = require("../model/devedor-model");
const {Credor} = require('../model/credor-model'); 
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



const generateToken = (userId, tipo) => {
    const secret = process.env.SECRET;
    const options = { expiresIn: '1h' };
    return jwt.sign({ id: userId, tipo: tipo }, secret, options);
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

             const token = generateToken(devedorExist._id,devedorExist.tipoConta);

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



const criarEmprestimo = asyncHandler(async (req, res) => {
    console.log(req.body);
    const userid = req.user.id;

    const { credorId, motivo, dataDevolucao, valor } = req.body;

 

    
    if (!credorId || !userid || !motivo || !dataDevolucao || !valor) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const credoGetId = await Credor.findOne({nomeEmpresa:credorId});

   

    

    if (!mongoose.Types.ObjectId.isValid(credoGetId) || !mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(400).json({ message: 'IDs inválidos.' });
    }

    console.log('passamos');

    const credorExist = await Credor.findById(credoGetId);

    console.log(credorExist);
    if (!credorExist) {
        return res.status(404).json({ message: 'Credor não encontrado.' });
    }

    const devedorExist = await devedorModel.findById(userid);
    if (!devedorExist) {
        return res.status(404).json({ message: 'Devedor não encontrado.' });
    }

    try {
        const emprestimo = await Emprestimo.create({
            credorId:credoGetId,
            devedorId:userid,
            motivo,
            dataDevolucao,
            valor
        });

        res.status(201).json({ message: 'Empréstimo criado com sucesso!', emprestimo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});





const listarEmprestimos = asyncHandler(async (req, res) => {
    try {
       
        const emprestimos = await Emprestimo.find()
            .populate({
                path: 'credorId',
                select: 'nomeEmpresa' 
            });

        const emprestimosFormatados = emprestimos.map(emprestimo => ({
            nomeEmpresa: emprestimo.credorId.nomeEmpresa,
            motivo: emprestimo.motivo,
            dataDevolucao: emprestimo.dataDevolucao,
            valor: emprestimo.valor,
            _id:emprestimo._id
        }));

        res.status(200).json(emprestimosFormatados);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

const listarEmprestimosById = asyncHandler(async (req, res) => {

    const emprestimoid = req.params.id;

        console.log("111..",emprestimoid);
    if (!mongoose.Types.ObjectId.isValid(emprestimoid)) {
        console.log('ID inválido');
        return res.status(404).json({ message: "Devedor não encontrado" });
    }

    console.log("222..",emprestimoid);
    const emprestimoById = await Emprestimo.findById(emprestimoid);

    console.log("333..", emprestimoById);

        try {

            console.log("444..", emprestimoById);
            if(!emprestimoById){
                console.log('Emprestimo não encontrado');
                res.status(404).json({message:"Emprestimo não encontrado"});
          
                }
            
                console.log("555..", emprestimoById);
                res.status(200).json({data:emprestimoById});
            
        } catch (error) {
            console.error(err);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }

});

    module.exports = {listarEmprestimosById,getAllDevedor,getDevedor,signupDevedor,login,updateDevedor,deleteDevedor,authenticateToken,criarEmprestimo,listarEmprestimos}