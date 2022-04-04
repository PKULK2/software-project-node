import Image from "../models/image/Image"

/**
 * @file declares API for Image related data access object methods.
 */
export default interface ImageDao {
    createImage(uid: string, suid: string, image: Image): Promise<Image>;
    findImagesByUser(uid: string, res: any): Promise<Image[]>;
    findImagesToUser(tid: string): Promise<Image[]>;
    deleteImage(uid: string, ruid: string, mid: string,): Promise<any>;
    findAllImages(): Promise<Image[]>;
}
