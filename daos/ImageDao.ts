/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose MessageDao
 * to integrate with MongoDB
 */
import ImageDaoI from "../interfaces/imageDao";
import ImageModel from "../mongoose/image/ImageModel";
import Image from "../models/image/Image";

/**
 * @class ImageDao Implements Data Access Object managing data storage
 * of Images
 * @property {ImageDao} ImageDao Private single instance of MessageDao
 */
export default class ImageDao implements ImageDaoI {
    /**
     * Uses ImageFollow to insert new values in the message collection
     * @returns Promise To be notified when the message is inserted in the
     * database
     */
    createImage = async (uid: string, ruid: string, image: any): Promise<Image> =>
        ImageModel.create({sender: uid, receiver: ruid, image: image});

    /**
     * MessageModel to remove a message instance from the database.
     * @param {string} uid Primary key of user that sent message
     * @param {string} ruid Primary key of the receiver's message to be removed
     * @param {string} iid Primary key of the message itself
     * @returns Promise To be notified when message instance is removed from the database
     */
    deleteImage =  async (uid: string, ruid: string, iid: string): Promise<any> =>
        ImageModel.deleteOne({sender: uid, receiver: ruid, _id: iid});

    // @ts-ignore
    /**
     * MessageModel to retrieve all messages sent by this user
     * @param {string} uid User's primary key
     * @returns Promise to be notified when the messages are retrieve from database
     */
    findImagesByUser = async (uid: string): Promise<Image[]> =>
        ImageModel.find({sender: uid})
            .sort({'postedOn': -1})
            .populate("receiver")
            .lean()
            .exec();

    /**
     * MessageModel to retrieve all messages sent to this user
     * @param {string} uid User's primary key
     * @returns Promise to be notified when the messages are retrieve from database
     */
    findImagesToUser = async (uid: string): Promise<Image[]> =>
        ImageModel.find({receiver: uid})
            .sort({'postedOn': -1})
            .lean()
            .populate("sender")
            .exec();

    /**
     * MessageModel to retrieve all Messages stored in the message collection
     * @returns Promise to be notified when the follows are retrieve from database
     */
    findAllImages = async (): Promise<Image[]> =>
        ImageModel.find()
            .populate("sender")
            .populate("receiver")
            .lean()
            .exec();

}

