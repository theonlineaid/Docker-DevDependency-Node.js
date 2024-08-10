import { Router } from "express";
import authCtrl from "../controllers/AuthCtrl.js";

const AuthRouter = Router();

AuthRouter.post('/register', authCtrl.register)
AuthRouter.post('/login', authCtrl.login)
AuthRouter.post('/post', authCtrl.createPost)
AuthRouter.get('/posts', authCtrl.getPosts)

export default AuthRouter;