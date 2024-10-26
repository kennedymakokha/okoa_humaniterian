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
        enum: ["mpesa", "cash", "bank"],
        default: "cash"
    },
    payment_for: {
        type: String,
        enum: ["electricity", "internent"],
    },
    validity: {
        type: Date,
        default: Date()
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

const Model = mongoose.model('miscpayment_tb', FinanceSchema);
export default Model