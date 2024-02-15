import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs"

const handler = async(req,res) => {
    await dbConnect();

    const { method, query:{id}} = req;
    
    if(method === "GET"){
        try{
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
        }
    }

    // herhangi bir deger icin degisiklik yapabilirim
    if(method === "PUT"){
        try{
            // sifreyi guncelledikten sonra hashlenmesi icin:
            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password, 10)
                req.body.confirmPassword = await bcrypt.hash(req.body.confirmPassword, 10)

            }
            // req.body den gelen herhangi bir degeri icin new: true
            const users = await User.findByIdAndUpdate(id, req.body,{
                new: true,
            })
            res.status(200).json(users);
        } catch (err) {
            console.log(err);
        }
    }

    
}

export default handler;