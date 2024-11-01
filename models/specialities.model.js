import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    speciality_name: {
        type: String,
    },
    consultation_fee: {
        type: Number,
    },
    desc: {
        type: String,
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

const Model = mongoose.model('speciality_tb', CourseSchema);
export default Model