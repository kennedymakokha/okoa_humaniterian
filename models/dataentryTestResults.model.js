import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;
const DataEntrySchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "user_tb",
    },
    accuracy: {
        type: Number
    },

    speed: {
        type: String
    },

    records: {
        type: String,
    },
    records_entered: {
        type: String,
    },
    test: {
        type: String,
    },
    time: {
        type: String,
    },
    studentName: {
        type: String,
    },

    deletedAt: {
        type: String,
        default: null,
    },

}, { timestamps: true });



const Model = mongoose.model('data_entry_practical_tb', DataEntrySchema);
export default Model