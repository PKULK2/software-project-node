/**
 * @file Controller RESTful Web service API for Bookmark resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import FollowDao from "../daos/FollowDao";
import MessageControllerI from "../interfaces/messageController";

/**
 * @class MessageDao Implements RESTful Web service API for message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/tuits/:tid to create a new bookmark instance for a given tuit</li>
 *     <li>DELETE /users/:uid/tuits/:tid to remove a particular bookmark instance</li>
 *     <li>GET /users/:uid/tuits to retrieve all the tuit bookmark instances by user</li>
 *     <li>GET /users/tuits to retrieve all of the bookmark instances</li>
 *     <li>GET /users/:uid/tuits/:tid to retrieve one bookmark instance</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao DAO implementing follow CRUD operations
 * @property {BookmarkController} bookmarkController controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    app: Express;
    messageDao: MessageDao
    followDao: FollowDao
    constructor(app: Express, messageDao: MessageDao, followDao: FollowDao) {
        this.app = app;
        this.messageDao = messageDao;
        this.followDao = followDao;
        this.app.post("/api/users/:uid/message/users/:ruid", this.createMessage);
        this.app.delete("/api/users/:uid/message/:mid/users/:ruid", this.deleteMessage);
        this.app.get("/api/users/:uid/user/messages", this.findMessagesByUser);
        this.app.get("/api/users/:uid/messages/user", this.findMessagesToUser);
        this.app.get("/api/messages", this.findAllMessages);
        this.app.put("/api/users/:uid/update/message/users/:ruid", this.updateMessage);
    }

    /**
     * Creates a bookmark object to be sent to database collection
     * @param {Request} req represents request from client including body
     * containing the JSON object for the new bookmark to be inserted in the database
     * @param {Response} res represents response to client, including the body formatted
     * as JSON containing the new bookmark that was inserted in the database
     */
    createMessage = async (req: any, res: any) => {
        const uid = req.params.uid;
        const ruid = req.params.ruid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const findFollow = await this.followDao.findOneFollow(userId, ruid);
            if(findFollow) {
                this.messageDao.createMessage(userId, ruid, req.body.message)
                    .then(message => res.json(message));
            }
            else {
                //pass
            }
            res.sendStatus(200);
        }
        catch (e) {
            res.sendStatus(404);
        }
    }
    /**
     * Deletes a bookmark object that contains the bookmarked tuit
     * @param {Request} req represents request from client including the
     * path parameters uid and ruid representing the sender user and the receiver user
     * primary's key
     * @param {Response} res represents response to client, including status on
     * whether deleting the message was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        this.messageDao.deleteMessage(req.params.uid, req.params.ruid, req.params.mid)
            .then(status => res.json(status));
    /**
     * Retrieves all messages sent by a particular user
     * @param {Request} req represents request from client including the path parameter uid
     * representing the user's primary's key
     * @param {Response} res represents response to client, including the body formatted as JSON containing
     * the follow object
     */
    findMessagesByUser = (req: Request, res: Response) =>
        this.messageDao.findMessagesByUser(req.params.uid)
            .then(follows => res.json(follows));
    /**
     * Retrieves all messages sent to a particular user
     * @param {Request} req represents request from client including the path parameter uid
     * representing the user's primary's key
     * @param {Response} res represents response from client including the body formatted as JSON containing
     * the message object
     */
    findMessagesToUser = (req: Request, res: Response) =>
        this.messageDao.findMessagesToUser(req.params.uid)
            .then(status => res.send(status));
    /**
     * Retrieves all messages stored in the database collection
     * @param {Request} req represents request from client
     * @param res represents response from client including the body formatted as JSON containing the array of messages
     */
    findAllMessages = (req: Request, res: Response) =>
        this.messageDao.findAllMessages()
            .then(message => res.json(message));

    /**
     * Updates a message stored in the database collection
     * @param {Request} req represents request from client including the path parameters uid and ruid
     * @param {Response} res represents response from client including status on whether update of message
     * was successful or not
     */
    updateMessage = (req: Request, res: Response) =>
        this.messageDao.updateMessage(req.params.uid, req.params.ruid, req.body)
            .then(status => res.json(status));

};