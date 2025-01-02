import { Request, Response } from 'express'
import { userService } from '../services/userService'

export const userController = {
  async createUser(req: Request, res: Response) {
    try {
      const newUser = await userService.createUser(req.body)
      res.status(201).json({
        message: 'User created successfully',
        user: newUser,
        status: 'success'
      })
    } catch (error) {
      res.status(500).json({
        error: 'Failed to create user',
        details: (error as Error).message,
        status: 'error'
      })
    }
  },

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers()
      res.status(200).json({
        message: 'Users fetched successfully',
        users,
        status: 'success'
      })
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch users',
        details: (error as Error).message,
        status: 'error'
      })
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(Number(req.params.id))
      if (user) {
        res.status(200).json({
          message: 'User fetched successfully',
          user,
          status: 'success'
        })
      } else {
        res.status(404).json({
          error: 'User not found',
          userId: req.params.id,
          status: 'failure'
        })
      }
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch user',
        details: (error as Error).message,
        status: 'error'
      })
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await userService.updateUser(
        Number(req.params.id),
        req.body
      )
      if (updatedUser) {
        res.status(200).json({
          message: 'User updated successfully',
          user: updatedUser,
          status: 'success'
        })
      } else {
        res.status(404).json({
          error: 'User not found',
          userId: req.params.id,
          status: 'failure'
        })
      }
    } catch (error) {
      res.status(500).json({
        error: 'Failed to update user',
        details: (error as Error).message,
        status: 'error'
      })
    }
  },

  async deleteUser(req: Request, res: Response) {
    const userId = Number(req.params.id)
    const isHardDelete = req.query.hardDelete === 'true'

    try {
      const deleted = await userService.deleteUser(userId, isHardDelete)

      if (deleted) {
        res.status(200).json({
          message: `User ${isHardDelete ? 'hard' : 'soft'}-deleted successfully`,
          userId,
          operation: isHardDelete ? 'hard delete' : 'soft delete',
          status: 'success'
        })
      } else {
        res.status(404).json({
          error: 'User not found',
          userId,
          operation: isHardDelete ? 'hard delete' : 'soft delete',
          status: 'failure'
        })
      }
    } catch (error) {
      res.status(500).json({
        error: 'Failed to delete user',
        details: (error as Error).message,
        userId,
        operation: isHardDelete ? 'hard delete' : 'soft delete',
        status: 'error'
      })
    }
  }
}
