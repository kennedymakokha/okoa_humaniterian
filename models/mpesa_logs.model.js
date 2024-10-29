var mongoose = require('mongoose');



const Schema = mongoose.Schema;
const WalletSchema = new Schema({

    contibution_id: {
        type: Schema.Types.ObjectId,
        ref: "contribution",
    },
    total_amount: {
        type: Number,
        default: 0
    },

}, { timestamps: true });



module.exports = mongoose.model('mpesa_logs_tb', WalletSchema);

