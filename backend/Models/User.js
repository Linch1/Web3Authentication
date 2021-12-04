import mongoose from 'mongoose';
var userSchema = mongoose.Schema({

	nonce: Number,
	address: {
        type: String,
        unique: true
    },
	username: {
        type: String,
        unique: true
    }, // for nullable fields

}, { timestamps: { createdAt: 'created_at' } });

userSchema.index({ 
    address: 1,
    username: 1
}, { unique: true })

export default mongoose.model('user', userSchema);
