import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const UserSchema = new Schema({
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
    specialization: {
        type: Schema.Types.ObjectId,
        ref: "speciality_tb",
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


    role: {
        type: String,
        enum: ["nurses", "doctors", "admin", "receptionists", "pharmacists","lab tech","accountants"],
        default: "patient"
    },

    dob: {
        type: String,
    },
    gender: {
        type: String,
    },
    reg_no: {
        type: String,
    },
    ID_no: {
        type: String,
    },

    hashPassword: {
        type: String,
        required: true
    },
    deletedAt: {
        type: String,
        default: null,
    },

}, { timestamps: true });

UserSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

const Model = mongoose.model('user_tb', UserSchema);
export default Model