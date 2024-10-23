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
    guardian: {
        type: Schema.Types.ObjectId,
        ref: "guardian_tb",
    },
    email: {
        type: String
    },
    activated: {
        type: Boolean,
        default: false
    },
    verification_code: {
        type: String,
    },
    adm_no: {
        type: String,
    },
    enroled: {
        type: Boolean,
        default: false
    },
    validity: {
        type: Date,
        default: Date()
    },
   
    role: {
        type: String,
        enum: ["student", "instructor", "admin", "supplier"],
        default: "student"
    },
    state: {
        type: String,
        enum: ["half-orphan", "total-orphan", "parented", "abandoned"],
        default: "parented"
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
    course: {
        type: Schema.Types.ObjectId,
        ref: "course_tb",
    },
    course_name: {
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