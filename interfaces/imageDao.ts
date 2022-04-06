import Image from "../models/image/Image"

/**
 * @file declares API for Image related data access object methods.
 */
export default interface ImageDao {
    createImage(uid: string, suid: string, image: any): Promise<Image>;
    findImagesByUser(uid: string): Promise<Image[]>;
    findImagesToUser(tid: string): Promise<Image[]>;
    deleteImage(uid: string, ruid: string, idd: string,): Promise<any>;
    findAllImages(): Promise<Image[]>;
}
