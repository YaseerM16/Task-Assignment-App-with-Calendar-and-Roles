import { Router } from "express";
import { expressCallback } from "../utils/expressCallback";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { signupValidator } from "../middlewares/signupValidator";
import { loginValidator } from "../middlewares/loginValidator";
import { SuperManagerRepository } from "../repositories/super.manager.repository";
import { SuperManagerService } from "../services/super.manager.service";
import { SuperManagerController } from "../controllers/SuperManagerController";

const router = Router();

const repository = new SuperManagerRepository();

const service = new SuperManagerService(repository);

const controller = new SuperManagerController(service);


router
    .route("/get-employees")
    .get(expressCallback(controller.getEmployees));

router
    .route("/get-all-employees")
    .get(expressCallback(controller.getAllEmployees));

router
    .route("/get-managers")
    .get(expressCallback(controller.getManagers));

router
    .route("/assign-manager")
    .put(expressCallback(controller.assignManager));

router
    .route("/promote-to-manager/:employeeId")
    .patch(expressCallback(controller.promoteToManager));

export { router as superManagerRoute };