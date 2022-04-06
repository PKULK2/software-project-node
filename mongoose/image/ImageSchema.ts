import mongoose, {Schema} from "mongoose";
import Image from "../../models/image/Image";

const ImageSchema = new mongoose.Schema<Image>({
    sender: {type: Schema.Types.ObjectId, ref: "UserModel"},
    receiver: {type: Schema.Types.ObjectId, ref: "UserModel"},
    image: {
        data: Buffer,
        contentType: String,
    },
    sentOn: {type: Date, default: Date.now()}
}, {collection: "images"})
export default ImageSchema;
