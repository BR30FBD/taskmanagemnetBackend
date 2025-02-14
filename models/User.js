const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    id: { type: Number, unique: true }, // Auto-incremented ID
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Apply auto-increment plugin to the `id` field
UserSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('User', UserSchema);
