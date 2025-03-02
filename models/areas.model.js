import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const AreaSchema = new Schema({
    area_name: {
        type: String,
    },
    deletedAt: {
        type: String,
        default: null,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user_tb",
    },
}, { timestamps: true });

const Model = mongoose.model('areas_tb', AreaSchema);
export default Model