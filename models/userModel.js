import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:String,
  password:{
    type:String, 
    required:true
  },
  links:Array
});

export default mongoose.model("users", UserSchema);
