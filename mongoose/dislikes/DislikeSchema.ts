import mongoose, {Schema} from "mongoose";
import DisLike from "../../models/dislikes/Dislike";

const DisLikeSchema = new mongoose.Schema<DisLike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DisLikeSchema;