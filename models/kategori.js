import mongoose from "mongoose";

const KategoriSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 30,
        },
    },
    { timestamps:true}
);

export default mongoose.models.kategori || mongoose.model("kategori", KategoriSchema )