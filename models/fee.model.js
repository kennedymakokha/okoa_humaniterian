import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const FeeSchema = new Schema({
    
    student_name: {
        type: String,
    },
    arrears: {
        type: Number,
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: "user_tb",
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

const Model = mongoose.model('payment_history_tb', FeeSchema);
export default Model