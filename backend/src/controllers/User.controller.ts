import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";

const bcrypt = require("bcrypt");

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await getRepository(User).find();
  if (users.length === 0) {
    res.status(204);
    return res.json();
  }
  return res.json(users);
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const results = await getRepository(User).findOne(req.params.id);
  if (results) {
    return res.json(results);
  } else {
    res.status(404);
    return res.json({ message: 'User not found' });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newUser = await getRepository(User).create(req.body);
    const results = await getRepository(User).save(newUser);
    return res.json(results);
  } catch (error) {
    res.status(400);
    return res.json({ error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(User).findOne(req.params.id);
  if (user) {
    getRepository(User).merge(user, req.body);
    const results = await getRepository(User).save(user);
    return res.json(results);
  }

  return res.json({ msg: 'User not found' });
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const results = await getRepository(User).delete(req.params.id);
  return res.json(results);
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  
  if (!(email && password)) {
    res.status(400);
    return res.json({ error: 'Email and password are required!' });
  }

  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail({ where: { email } })
  } catch (error) {
    res.status(404);
    return res.json({ error });
  }

  let check = false;

  try {
    check = await bcrypt.compareSync(password, user.password)
  } catch (error) {
    check = false;
    res.status(500);
    return res.json({ error: 'An error occurred.' });
  }
  
  if (check) {
    const token = jwt.sign(
      { userId: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
      `${process.env.JWT_SECRET}`,
      { expiresIn: '1h' },
    );

    //Send the jwt in the response
    res.status(200);
    return res.json({ accessToken: token });
  } else {
    res.status(401);
    return res.json({ error: 'Invalid password' });
  }
}

export const me = async (req: Request, res: Response): Promise<Response> => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    // @ts-ignore
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

    return res.json(decoded);
  } catch (error) {
    res.status(400);
    return res.json({ error });
  }
}