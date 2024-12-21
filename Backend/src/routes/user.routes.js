import router from "express";
import { body } from "express-validator";
import {
  register,
  login,
  logout,
  getUserProfile,
} from "../controllers/user.controllers.js";
import auth from "../middlewares/auth.middlware.js";

const userRouter = router.Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("fullName.firstName")
      .isString()
      .isLength({ min: 2 })
      .withMessage("First Name must be at least 2 characters long"),
  ],
  register
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  login
);

userRouter.get("/logout", auth, logout);

userRouter.get("/profile", auth, getUserProfile);

export default userRouter;
