import { Router } from "express";
import AuthRouter from "./AuthRouter.js";

const RootRouter = Router();

RootRouter.use("/auth", AuthRouter)


export default RootRouter;