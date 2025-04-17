import { Router } from "express";
import { expressCallback } from "../utils/expressCallback";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { signupValidator } from "../middlewares/signupValidator";
import { loginValidator } from "../middlewares/loginValidator";

const router = Router();

const repository = new UserRepository();

const service = new UserService(repository);

const controller = new UserController(service);

router
    .route("/signup")
    .post(signupValidator, expressCallback(controller.userSignup));

router
    .route("/login")
    .post(loginValidator, expressCallback(controller.userLogin));

router
    .route("/get-users")
    .get(expressCallback(controller.getUsers));



export { router as userRoutes };