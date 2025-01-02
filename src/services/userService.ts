import { eq, isNull } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { db } from '../db/index'
import { usersTable } from '../db/schema'

type UserInput = Omit<
  typeof usersTable.$inferInsert,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
type User = typeof usersTable.$inferSelect

export const userService = {
  async getAllUsers(): Promise<User[]> {
    try {
      return await db
        .select()
        .from(usersTable)
        .where(isNull(usersTable.deletedAt))
    } catch (error) {
      console.error('Error fetching users:', error)
      throw new Error('Failed to fetch users')
    }
  },

  async getUserById(id: number): Promise<User | undefined> {
    try {
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id))
      return user
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error)
      throw new Error('Failed to fetch user')
    }
  },

  async createUser(userData: UserInput): Promise<User> {
    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      const userDataWithHashedPassword = {
        ...userData,
        password: hashedPassword
      }

      const [newUser] = await db
        .insert(usersTable)
        .values(userDataWithHashedPassword)
        .returning()
      return newUser
    } catch (error) {
      console.error('Error creating user:', error)
      throw new Error('Failed to create user')
    }
  },

  async updateUser(
    id: number,
    userData: Partial<UserInput>
  ): Promise<User | undefined> {
    try {
      const [updatedUser] = await db
        .update(usersTable)
        .set(userData)
        .where(eq(usersTable.id, id))
        .returning()
      return updatedUser
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error)
      throw new Error('Failed to update user')
    }
  },

  async deleteUser(id: number, isHardDelete = false): Promise<boolean> {
    try {
      if (isHardDelete) {
        // Hard delete: remove the record from the database
        const result = await db.delete(usersTable).where(eq(usersTable.id, id))
        const rowsAffected = result.rowCount ?? 0

        if (rowsAffected > 0) {
          console.log(`User with ID ${id} hard-deleted successfully.`)
          return true
        } else {
          console.log(`No user found with ID ${id}. Hard deletion failed.`)
          return false
        }
      } else {
        // Soft delete: set the deletedAt field to the current timestamp
        const result = await db
          .update(usersTable)
          .set({ deletedAt: new Date() })
          .where(eq(usersTable.id, id))
        const rowsAffected = result.rowCount ?? 0

        if (rowsAffected > 0) {
          console.log(`User with ID ${id} soft-deleted successfully.`)
          return true
        } else {
          console.log(`No user found with ID ${id}. Soft deletion failed.`)
          return false
        }
      }
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error)
      return false
    }
  }
}
