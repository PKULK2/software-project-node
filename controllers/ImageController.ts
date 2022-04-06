/**
 * @file Controller RESTful Web service API for Bookmark resource
 */
import {Express, Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import ImageDao from '../daos/ImageDao'
import FollowDao from '../daos/FollowDao'
import ImageControllerI from '../interfaces/imageController';
import * as fs from "fs";
import path from "path/posix";

export default class ImageController implements ImageControllerI {
    app: Express;
    imageDao: ImageDao;
    followDao: FollowDao;
    upload: any;
    constructor(app: Express, imageDao: ImageDao, followDao: FollowDao, upload: any) {
        this.app = app;
        this.imageDao = imageDao;
        this.followDao = followDao;
        this.upload = upload;
        this.app.post('/api/user/:uid/image/user/:ruid', this.createImage)
        this.app.delete('/api/user/:uid/image/:iid/user/:ruid', this.deleteImage)
        this.app.get('/api/user/:uid/image/user', this.findImagesByUser)
        this.app.get('/api/user/:uid/user/image', this.findImagesToUser)
    }

    createImage = async (req: any, res: any) => {
        const uid = req.params.uid;
        const ruid = req.params.ruid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        const followExist = await this.followDao.findOneFollow(uid, ruid);
        if(followExist) {
            this.upload.single('image');
            // @ts-ignore
            const image = {data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimeType}
            const savedImage = await this.imageDao.createImage(userId, ruid, image)
            res.send(savedImage);
        }
    }

    deleteImage = async (req: Request, res: Response) =>
        this.imageDao.deleteImage(req.params.uid, req.params.ruid, req.params.iid)
            .then(status => res.json(status))

    findImagesByUser = async (req: any, res: any) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        const image = await this.imageDao.findImagesByUser(userId)
        res.send(image)
    }

    findImagesToUser = async (req: any, res: any) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        await this.imageDao.findImagesToUser(userId)
            .then(image => res.json(image));
    }

    findAllImages = async (req: Request, res: Response) =>
        this.imageDao.findAllImages()
            .then(images => res.json(images));


}