import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const userController = {
    async createUser(req: Request, res: Response) {
        try {
          const newUser = await userService.createUser(req.body);
          res.status(201).json(newUser);
        } catch (error) {
          console.error('Failed to create user:', error);
          res.status(500).json({ error: 'Failed to create user', details: (error as Error).message });
        }
      },

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(Number(req.params.id));
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await userService.updateUser(Number(req.params.id), req.body);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const deleted = await userService.deleteUser(Number(req.params.id));
      if (deleted) {
        res.status(204).send(); // Success, no content
      } else {
        res.status(404).json({ error: 'User not found' }); // Not found
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' }); // Server error
    }
  },  
};
