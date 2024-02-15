import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const handler = async(req,res) => {
    await dbConnect();

    const body = req.body
    const user = await User.findOne({ email: body.email})
    if(user){
        res.status(400).json({ message: "Bu kullanıcı zaten var"})
        return;
    }
    try{
        const newUser = await new User(body);
        // sifreyi hashlemek icin - veritabaninda gozukmemesi icin
        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(newUser.password, salt)
        newUser.confirmPassword = await bcrypt.hash(newUser.password, salt)
        await newUser.save()
        res.status(200).json(newUser)

    }catch(error){
        console.log(error);
    }

}

export default handler;