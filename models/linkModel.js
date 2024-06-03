import mongoose from "mongoose";
import ClickModel from "./clickModel.js";
import TargetModel from "./targetModel.js";


const LinkSchema = mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  clicks: [ClickModel.schema],
  targetParamName: {
    type:String, 
    default: "t"
  },
  targetValues:[TargetModel.schema]
});

export default mongoose.model("links", LinkSchema);
