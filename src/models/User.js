const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    date:{type: Date, default: Date.now} 
});
UserSchema.methods.encryptPassword = async (password) => {         //***yo escojo nombre encryptPassword
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};
UserSchema.methods. matchPassword = async function(password){ //pwd q ingresa usuario y yo escojo matchPassword
    return await bcrypt.compare(password, this.password);  //this es el pwd de
};

module.exports = mongoose.model('User', UserSchema);