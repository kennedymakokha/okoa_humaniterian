import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const patientSchema = new Schema({
    name: {
        type: String,
    },
    phone_number: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user_tb",
    },
    guardian: {
        type: Schema.Types.ObjectId,
        ref: "guardian_tb",
    },
    email: {
        type: String
    },

    admitted: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    }, 
    dob: {
        type: String,
    },
    gender: {
        type: String,
    },
    ID_no: {
        type: String,
    },
    deletedAt: {
        type: String,
        default: null,
    },

}, { timestamps: true });


const Model = mongoose.model('user_tb', patientSchema);
export default Model