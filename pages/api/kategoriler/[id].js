import dbConnect from "../../../util/dbConnect";
import kategori from "../../../models/kategori";

const handler = async(req,res) => {
    await dbConnect();

    const { method, query:{id}} = req;
    
    if(method === "GET"){
        try{
            const katg = await kategori.findById(id);
            res.status(200).json(katg);
        } catch (error) {
            console.log(error);
        }
    }

    if(method === "DELETE"){
        try{
            const kat = await kategori.findByIdAndDelete(id);
            res.status(200).json(kat);

        } catch (err) {
            console.log(err);
        }
    }

    
}

export default handler;