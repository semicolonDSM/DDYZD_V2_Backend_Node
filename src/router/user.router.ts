import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from "../middleware/verifyToken";
import { UserController } from "../controller/user.controller";
import { validationRequest } from "../middleware/validatoinRequest";
import { ModifyUserBioSchema, ModifyUserGitHubIdSchema, ProvideUserTokenSchema } from "../shared/DataTransferObject";

const router: Router = Router();
export const userServiceRouter = (app :Router) => {
  const userController: UserController = new UserController();

  app.use("/users", router);

  router.get(
    "/token", 
    errorHandler(userController.provideToken)
  );

  router.post(
    "/token/code",
    validationRequest(ProvideUserTokenSchema),
    errorHandler(userController.proviceTokenWithCode)
  );
  
  router.get(
    "/refresh", 
    verifyRefreshTokenMiddleware, 
    errorHandler(userController.refreshToken)
  );

  router.get(
    "/profile",
    verifyTokenMiddleware,
    errorHandler(userController.showUserGcn)
  );

  router.get(
    "/activity",
    verifyTokenMiddleware,
    errorHandler(userController.showUserActivities)
  );
  
  router.get(
    "/:user_gcn", 
    errorHandler(userController.showUserInfo)
  );
  
  router.put(
    "/profile/git", 
    verifyTokenMiddleware, 
    validationRequest(ModifyUserGitHubIdSchema),
    errorHandler(userController.modifyUserGithubId)
  );

  router.put(
    "/profile/bio", 
    verifyTokenMiddleware, 
    validationRequest(ModifyUserBioSchema),
    errorHandler(userController.modifyUserBio)
  );

  router.post(
    "/device_token", 
    verifyTokenMiddleware, 
    errorHandler(userController.deviceToken)
  );
}
