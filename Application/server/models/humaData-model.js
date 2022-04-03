import  mongoose from 'mongoose'
const Schema = mongoose.Schema

const HumaData = new Schema(
    {
        user:{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        _id: { type: String, required: true },
        time: { type: [String], required: true },
        hrValue: { type: Number, required: true },
        irValue: { type: Number, required: true },
        redlightValue: { type: Number, required: true },
        validValue: { type: Number, required: true },
        tempValue: { type: Number, required: true },
        humidityValue: { type: Number, required: true },
        xValue: { type: Number, required: true },
        yValue: { type: Number, required: true },
        zValue: { type: Number, required: true },

        
    },{

    timestamps:true
    }
)

export default mongoose.model('HumaData', HumaData)

