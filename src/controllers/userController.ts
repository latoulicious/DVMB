import { Request, Response } from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from '../db/schema';

const db = drizzle(process.env.DATABASE_URL!);

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, name, gender, roleId } = req.body;
        const newUser = await db.insert(usersTable).values({
            email,
            password,
            name,
            gender,
            roleId,
        }).returning();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await db.select().from(usersTable);
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await db
            .select()
            .from(usersTable)
            .where(usersTable.id, id) // Use the column directly with the value
            .single();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};



// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, password, name, gender, status, roleId } = req.body;
        const updatedUser = await db
            .update(usersTable)
            .set({
                email,
                password,
                name,
                gender,
                status,
                roleId,
                updatedAt: new Date(),
            })
            .where(usersTable.id, id) // Use the column directly with the value
            .returning();
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};


// Delete a user by ID with soft or hard delete
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { hardDelete } = req.query;  // Determine hard delete through query param
        
        let deletedUser;
        if (hardDelete === 'true') {
            // Perform hard delete (completely remove)
            deletedUser = await db
                .deleteFrom(usersTable)
                .where(usersTable.id, id) // Direct comparison with the column
                .returning();
            if (!deletedUser || deletedUser.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({ message: 'User permanently deleted' });
        } else {
            // Perform soft delete (mark as deleted)
            deletedUser = await db
                .update(usersTable)
                .set({
                    deletedAt: new Date(), // Mark as deleted by setting deletedAt timestamp
                })
                .where(usersTable.id, id) // Direct comparison with the column
                .returning();
            if (!deletedUser || deletedUser.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(deletedUser);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
