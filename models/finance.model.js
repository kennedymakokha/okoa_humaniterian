import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const FinanceSchema = new Schema({
    amount: {
        type: Number,
        default: 0
    },
    mode: {
        type: String,
    },
    receipt: {
        type: String,
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

const Model = mongoose.model('payment_tb', FinanceSchema);
export default Model