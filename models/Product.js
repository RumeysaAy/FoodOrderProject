import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        baslik: { //title
            type: String,
            required: true,
            maxlength: 60,
        },

        tanitim:{ //desc
            type: String,
            required: true,
            maxlength: 300,
        },

        fiyat:{ //prices
            type: [Number],
            required: true,
        },

        kategori:{ //category
            type: String,
            required: true,
            maxlength: 30,
        },

        img:{
            type: String,
            required: true,
        },

        extraOptions:{
            type:[
                {
                    text:{type:String}, //ismi
                    price:{type:Number}, //fiyati
                }
            ]
        }





    },

    { timestamps: true }

);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);