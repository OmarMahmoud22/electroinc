const User = require("../Models/User")
const  bcrypt =require("bcrypt")




const regester = async(req,res)=>{
    
    try{
   const {name,email,password,role}=req.body;

   if(!name||!email||!password)
   return res.status(400).json({msg:"missing data"})

   const existUser = await User.findOne({email});
   if(existUser)return res.status(400).json({msg:"wrong data"})

   const hashPassword = await bcrypt.hash(password,10);


   const user =await User.create({
       name,
       email,
       password:hashPassword,
       role
   });

   res.status(201).json({
     msg:"done created User",
     data:user,
   });

    }

    catch(error){

        console.log(error);
    }

}

const  getuser = async(req,res)=>{
    try{
        const user = await User.find();
        res.status(200).json({
            msg:"done created User",
            data:user,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg:"server error"
        })
    }
}
const login = async(req,res)=>{

    
try{
 
const {email,password}=req.body;

if (!email||!password)
return res.status(400).json({msg:"missing data"});


const user = await User.findOne({email});
   if(!user)return res.status(404).json({msg:"your accont not found"});


   const matchPassword = await bcrypt.compare(password,user.password);
   if(!matchPassword)return res.status(400).json({msg:"invalid password"});
   
  res.status(200).json({
      msg: "login success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
}

  catch(error){

        console.log(error);
    }

}



module.exports={
    regester,
    login,
    getuser,
    // add_product,
    // get_product
}
