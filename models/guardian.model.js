import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const GuardianSchema = new Schema({
    name: {
        type: String,
    },
    phone_number: {
        type: String
    },

    email: {
        type: String
    },
    address: {
        type: String
    },

    ID_no: {
        type: String,
    },

    deletedAt: {
        type: String,
        default: null,
    },
    relationship: {
        type: String,
        enum: ["parent", "guardian", "sibling"],
        default: "parent"
    },

}, { timestamps: true });



const Model = mongoose.model('guardian_tb', GuardianSchema);
export default Model