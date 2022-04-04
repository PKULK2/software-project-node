/**
 * @file Controller RESTful Web service API for Bookmark resource
 */
import {Express, Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import ImageDao from '../daos/ImageDao'
import FollowDao from '../daos/FollowDao'
import ImageControllerI from '../interfaces/imageController';


export default class ImageController implements ImageControllerI {
    app: Express;
    imageDao: ImageDao;
    followDao: FollowDao;
    constructor(app: Express, imageDao: ImageDao, followDao: FollowDao) {
        this.app = app;
        this.imageDao = imageDao;
        this.followDao = followDao;
        this.app.post('/api/user/:uid/image/user/:ruid', this.createImage)
        this.app.delete('/api/user/:uid/image/:iid/user/:ruid', this.deleteImage)
        this.app.get('/api/user/:uid/image/user/:ruid', this.findImagesByUser)
        this.app.get('/api/user/:uid/user/:ruid/image', this.findImagesToUser)
    }

    createImage = async (req: Request, res: Response) =>
        this.imageDao.createImage(req.params.uid, req.params.ruid, req.body.image)
            .then(image => res.json(image));

    deleteImage = async (req: Request, res: Response) =>
        this.imageDao.deleteImage(req.params.uid, req.params.ruid, req.params.)
            .then(status => res.json(status))

    findImagesByUser(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    findImagesToUser(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    findAllImages(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }

}