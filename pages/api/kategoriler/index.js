import dbConnect from "../../../util/dbConnect";
import kategori from "../../../models/kategori";

const handler = async(req, res) => {
    await dbConnect();
    const { method } = req;

    if ( method === "GET" ){
        try{
            const kategoriler = await kategori.find();
            res.status(200).json(kategoriler);

        } catch (err) {
            console.log(err)

        }

    }

    if ( method === "POST" ){
        try {
            const yeniKategori = await kategori.create(req.body);
            res.status(200).json(yeniKategori);

        } catch (err){
            console.log(err);
        }
    }
}

export default handler;