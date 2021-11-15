import  mongoose from 'mongoose'
const Schema = mongoose.Schema

const HumaData = new Schema(
    {
        _id: { type: String, required: true },
        time: { type: [String], required: true },
        value: { type: Number, required: true },

        
    },
    { timestamps: true },
)

export default mongoose.model('HumaData', HumaData)

