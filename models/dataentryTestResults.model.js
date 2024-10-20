import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const DataEntrySchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "user_tb",
    },
    accuracy: {
        type: Number
    },

    speed: {
        type: String
    },

    records: {
        type: String,
    },
    time: {
        type: String,
    },

    deletedAt: {
        type: String,
        default: null,
    },

}, { timestamps: true });



const Model = mongoose.model('guardian_tb', DataEntrySchema);
export default Model