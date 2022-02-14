import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Movie } from "../entity/Movie";
import { Comment } from "../entity/Comment";
import { Like } from "../entity/Like";
import { Actor } from "../entity/Actor";

export const getMyMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movies = await getRepository(Movie).find({
    where: { userId: res.locals.user.userId },
    relations: ['comments', 'likes', 'actors'],
  });
  if (movies.length === 0) {
    res.status(204);
    return res.json();
  }
  return res.json(movies);
};

export const getMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movies = await getRepository(Movie).find({
    where: { isPrivate: false },
    relations: ['comments', 'likes', 'actors'],
  });
  if (movies.length === 0) {
    res.status(204);
    return res.json();
  }
  return res.json(movies);
};

export const getMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const results = await getRepository(Movie).findOne({
    where: { id: req.params.id },
    relations: ['comments', 'likes', 'actors'],
  });
  if (results) {
    return res.json(results);
  } else {
    res.status(404);
    return res.json({ message: 'Movie not found' });
  }
};

export const createMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newMovie = await getRepository(Movie).create(req.body);
    const results = await getRepository(Movie).save(newMovie);
    return res.json(results);
  } catch (error) {
    res.status(400);
    return res.json({ error });
  }
};
export const updateMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movie = await getRepository(Movie).findOne(req.params.id);
  if (movie) {
    getRepository(Movie).merge(movie, req.body);
    const results = await getRepository(Movie).save(movie);
    return res.json(results);
  }

  return res.json({ msg: 'User not found' });
};

export const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const results = await getRepository(Movie).delete(req.params.id);
  return res.json(results);
};

export const addComment = async (req: Request, res: Response): Promise<Response> => {
  const movie = await getRepository(Movie).findOne({
    where: { id: req.params.id, isPrivate: false },
  });
  if (movie) {
    try {
      const { userId } = res.locals.user;
      const newComment = await getRepository(Comment).create({
        userId,
        movieId: req.params.id,
        ...req.body
      });
      await getRepository(Comment).save(newComment);
      return res.status(201).json();
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  return res.status(404).json({ message: 'Movie not found.' });
};

export const addActor = async (req: Request, res: Response): Promise<Response> => {
  const movie = await getRepository(Movie).findOne({
    where: { id: req.params.id, isPrivate: false } });
  if (movie) {
    try {
      const { userId } = res.locals.user;
      const newActor = await getRepository(Actor).create({
        userId,
        movieId: req.params.id,
        ...req.body
      });
      await getRepository(Actor).save(newActor);
      return res.status(201).json();
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  return res.status(404).json({ message: 'Movie not found.' });
}

export const like = async (req: Request, res: Response): Promise<Response> => {
  const movie = await getRepository(Movie).findOne(req.params.id);
  if (movie) {
    const like = await getRepository(Like).findOne({
      where: { userId: res.locals.user.userId, movieId: req.params.id }
    });
    if (like) {
      return res.status(409).json({ message: 'You have already liked this movie.' });
    } else {
      try {
        const { userId } = res.locals.user;
        const newLike = await getRepository(Like).create({
          userId,
          movieId: req.params.id,
        });
        await getRepository(Like).save(newLike);
        return res.status(201).json();
      } catch (error) {
        res.status(400).json({ error });
      }
    }
  }
  return res.status(404).json({ message: 'Movie not found.' });
}

export const unlike = async (req: Request, res: Response): Promise<Response> => {
  const like = await getRepository(Like).findOne({
    where: { userId: res.locals.user.userId, movieId: req.params.id }
  });
  if (like) {
    const results = await getRepository(Like).delete(like.id);
    return res.status(204).json();
  } else {
    return res.status(404).json({ message: 'You haven\'t liked this movie before.' });
  }
}