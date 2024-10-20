import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const practicalSchema = new Schema({
    prac_name: {
        type: String,
    },
    prac_duration: {
        type: String,
    },
    csv_file: {
        type: String,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "course_tb",
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

const Model = mongoose.model('practical_tb', practicalSchema);
export default Model