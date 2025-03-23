import Admin from "../Model/admin.model.js";
import Product from "../Model/product.model.js";
export const registerAdmin = async(req,res)=>{
    const {name,position,password,email} = req.body;
    if(!name||!position||!password||!email){
        return res.status(400).json({success:false,message:"Fields required!"})
    }
    const alreadyExisitng = await Admin.findOne({
        $or:[{name},{email}]
    })
    if(alreadyExisitng) return res.status(401).json({success:true,message:"An admin with this name or this email address already exists!"})
    try {
        const registeredAdmin = await Admin.create({name,position,password,email});
        if(!registeredAdmin) throw new Error("Error while creating the admin!")
        return res.status(201).json({success:true,message:"Successfully registered!"})
        } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}

export const addedPatientToAdmin = async(req,res)=>{
    const {patientID,adminID} = req.body;
    const foundAdminById = await Admin.findById(adminID);
    const foundPatient = await Product.findById(patientID);
    try {
        if(!foundAdminById||!foundPatient) throw new Error("Error while parsing patient to the admin.")
        foundAdminById.patients.push(foundPatient)
    await foundAdminById.save()
       return res.status(201).json({success:true,message:foundAdminById})
        } catch (error) {
       return res.status(500).json({success:false,message:error.message})
    }
} 

export const SeeEachAdmin = async(req,res)=>{
    const {id} = req.params;
    try {
        const admin =await Admin.findById(id).populate("patients");
        return res.status(200).json({success:true,message:admin})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

export const loginAdmin = async(req,res)=>{
    const {name,password} = req.body;
    if(!name||!password){
        return res.status(400).json({success:false,message:"Fill the fields!"})
    }
    try {
       const userExitIntheList = await Admin.findOne({name});
       if(!userExitIntheList) return res.status(404).json({success:false,message:"No registered admin with your name and password!"})
       const passwordMatch = await userExitIntheList.passwordMatch(password);
      if(!passwordMatch){
        return res.status(401).json({success:false,message:"Wrong password!"})
      }
      const token = await userExitIntheList.tokenEmit();
      console.log(token)
      return res.status(200).json({success:true,message:{token:token,adminID:userExitIntheList._id}})
    } catch (error) {
        return res.status(400).json({success:true,message:error.message}) 
    }
}