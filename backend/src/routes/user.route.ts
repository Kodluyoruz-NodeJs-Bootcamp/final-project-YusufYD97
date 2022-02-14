import { Router } from "express";
import { CheckToken, CheckSelf } from '../middleware';
const router = Router();

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  me,
} from "../controllers/User.controller";

router.get("/users", CheckToken, getUsers);
router.get("/users/:id", CheckToken, CheckSelf, getUser);
router.post("/users", createUser);
router.put("/users/:id", CheckToken, CheckSelf, updateUser);
router.delete("/users/:id", CheckToken, CheckSelf, deleteUser);
router.post("/users/login", login);
router.post("/users/me", CheckToken, me);

export default router;