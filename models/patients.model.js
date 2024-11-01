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
    reg_no: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user_tb",
    },
    state: {
        type: String,
        enum: ["checked-in", "triage-table", "doctors-table", "lab","doctors-table-after", "pharmacy", "admitted", "discharged"],
        default: "checked-in"
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
    age: {
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


const Model = mongoose.model('patients_tb', patientSchema);
export default Model