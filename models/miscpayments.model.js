import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const MishisSchema = new Schema({
    
    student_name: {
        type: String,
    },
    amount: {
        type: Number,
    }, 
    validity: {
        type: Date,
        default: Date()
    },
    payment_for: {
        type: String,
        enum: [ "electricity", "internent"],    
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

const Model = mongoose.model('misc_payment_history_tb', MishisSchema);
export default Model