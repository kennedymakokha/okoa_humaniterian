import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    observation_id: {
        type: Schema.Types.ObjectId,
        ref: "observations_tb",
    },
    test_id: {
        type: Schema.Types.ObjectId,
        ref: "tests_tb",
    },
    outcome: {
        type: Boolean,
        default: false
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

const Model = mongoose.model('lab_tests_tb', CourseSchema);
export default Model