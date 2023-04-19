import user from "../../../models/user"
import connectDb from "../../../lib/mongoose"
import bcrypt from "bcrypt";
const handler = async(req,res)=>{
    if(req.method==='POST'){
        await connectDb()
        const {name,email,password} = req.body
        const hashedPassword = await bcrypt.hash(password,11)
        let u = new user({name,email,password:hashedPassword})
        await u.save()
        res.status(200).json({succes:"success"})
    }
    else
        res.status(400).json({error:"This Metod is not allowed"})
}

export default handler