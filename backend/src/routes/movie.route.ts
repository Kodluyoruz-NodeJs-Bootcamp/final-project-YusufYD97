import { Router } from "express";
import checkToken from '../middleware/checkToken';
const router = Router();

import {
  getMyMovies,
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  addComment,
  addActor,
  like,
  unlike,
} from "../controllers/Movie.controller";

router.get("/movies/my", checkToken, getMyMovies);
router.get("/movies", checkToken, getMovies);
router.get("/movies/:id", checkToken, getMovie);
router.post("/movies", checkToken, createMovie);
router.put("/movies/:id", checkToken, updateMovie);
router.post("/movies/:id/comment", checkToken, addComment);
router.post("/movies/:id/actors", checkToken, addActor);
router.post("/movies/:id/like", checkToken, like);
router.post("/movies/:id/unlike", checkToken, unlike);
router.delete("/movies/:id", checkToken, deleteMovie);

export default router;