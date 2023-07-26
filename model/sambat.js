import mongoose, { Schema,model,models } from "mongoose";

const SambatSchema=new Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    sambat:{
        type:String,
        required:[true,'Sambatan is required!']
    },
    tag:{
        type:String,
        required:[true,'Tag is required!']
    }
})

const Sambat=models.Sambat || model('Sambat',SambatSchema)

export default  Sambat