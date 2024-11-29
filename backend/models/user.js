const mongoose = require('mongoose');

/*const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});*/


const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true }, // Changed `name` to `fullName`
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' }

});

module.exports = mongoose.model('User', userSchema);



