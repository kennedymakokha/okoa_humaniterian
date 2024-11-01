import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    drug_name: {
        type: String,
    },
    price: {
        type: Number,
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

const Model = mongoose.model('drugs_tb', CourseSchema);
export default Model