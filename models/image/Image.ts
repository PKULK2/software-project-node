import User from "../users/User";

export default interface Image {
    sender: User,
    receiver: User,
    name: String,
    desc: String,
    image: any
    sentOn?: Date
}