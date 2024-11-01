import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    test_name: {
        type: String,
    },
    test_fee: {
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

const Model = mongoose.model('tests_tb', CourseSchema);
export default Model