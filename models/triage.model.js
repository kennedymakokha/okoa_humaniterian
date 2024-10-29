import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const TriageSchema = new Schema({
    temp: { type: String, },
    bloodpressure: { type: String },
    height: { type: String },
    bloodsugar: { type: String },
    weight: { type: String },
    patient_id: { type: Schema.Types.ObjectId, ref: 'user_tb' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user_tb' },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });

const Model = mongoose.model('triage_tb', TriageSchema);
export default Model