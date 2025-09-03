const { isStrongPassword, isValidEmail } =  require("../utils/validator");

const {User} = require("../models/User");
const generateToken = require("../utils/jwt");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  console.log("request hit backend start");

  try {
    const { username, email, password } = req.body;
    console.log("user body is ",req.body);
    if(!username || !email || !password){
      return res.json({message:"Enter all field correctly"});
    }
    const tempuser = await User.findOne({$or:
      [{email:email} ,
       {username:username}]});
    if(tempuser){
      return res.json({message:"user already exist"});
    }

    const user = new User({ username, email, password });
    const response = await user.save();
    if(response){
      return res.json({ token: generateToken(user._id) });

    }
    else{
      console.log("in registering else condition");
      return res.json({message:"Error while registering"})
    }
  } catch (error) {
    console.log("Error while registering: ",error);
    return res.json({message:"Error while registering"});
  }
};

 const login = async (req,res)=>{
try {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please enter both email and password"});
    }
    if(!isValidEmail(email) || !isStrongPassword(password)){
      return res.status(400).json({message:"Please enter valid email and password"});
    }
    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password,user.password)){
        res.json({token:generateToken(user._id)});
    }
    else{
        return res.status(401).json({message:"Invalid credentials"});
    }
} catch (error) {
    
    console.log("Error while Login: ",error);
    return res.status(500).json({message:"An error occured while  loggin in. Please try again"});
}
}

module.exports = {register,login}
