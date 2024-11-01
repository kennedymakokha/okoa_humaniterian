import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    observation: {
        type: String,
    },
    patient_id: {
        type: Schema.Types.ObjectId,
        ref: "patients_tb",
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

const Model = mongoose.model('observations_tb', CourseSchema);
export default Model