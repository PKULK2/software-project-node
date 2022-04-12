import Tuit from "../models/Tuit";
import User from "../models/User";

export default interface DisLike {
    tuit: Tuit,
    dislikedBy: User
};