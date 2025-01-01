import { eq } from 'drizzle-orm';
import { db } from '../db/index';
import { usersTable } from '../db/schema';

type UserInput = Omit<typeof usersTable.$inferInsert, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
type User = typeof usersTable.$inferSelect;

export const userService = {
    async createUser(userData: UserInput): Promise<User> {
        try {
          const [newUser] = await db.insert(usersTable)
            .values(userData)
            .returning();
          return newUser;
        } catch (error) {
          console.error('Error creating user:', error);
          throw error;  // Re-throw the error to be caught by the controller
        }
      },

  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return user;
  },

  async updateUser(id: number, userData: Partial<UserInput>): Promise<User | undefined> {
    const [updatedUser] = await db.update(usersTable)
      .set(userData)
      .where(eq(usersTable.id, id))
      .returning();
    return updatedUser;
  },

  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(usersTable).where(eq(usersTable.id, id));
    
    // Check if result.rowCount is null or undefined and handle safely
    const rowsAffected = result.rowCount ?? 0;
    return rowsAffected > 0;
  },
  

  async getAllUsers(): Promise<User[]> {
    return db.select().from(usersTable);
  }
};