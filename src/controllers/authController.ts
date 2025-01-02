import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userService } from '../services/userService'

const { getUserByEmail } = userService

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await getUserByEmail(email)

    if (!user) {
      res.status(400).json({ message: 'User not found' })
      return
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      res.status(400).json({ message: 'Invalid password' })
      return
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h'
    })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
