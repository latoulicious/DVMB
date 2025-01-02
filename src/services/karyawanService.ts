import { eq, isNull } from 'drizzle-orm'
import { db } from '../db/index'
import { karyawanTable } from '../db/schema'

type KaryawanInput = Omit<
  typeof karyawanTable.$inferInsert,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
type Karyawan = typeof karyawanTable.$inferSelect

export const karyawanService = {
  async createKaryawan(karyawanData: KaryawanInput): Promise<Karyawan> {
    try {
      const [newKaryawan] = await db
        .insert(karyawanTable)
        .values(karyawanData)
        .returning()
      return newKaryawan
    } catch (error) {
      console.error('Error creating karyawan:', error)
      throw new Error('Failed to create karyawan')
    }
  },

  async getAllKaryawan(): Promise<Karyawan[]> {
    try {
      return await db
        .select()
        .from(karyawanTable)
        .where(isNull(karyawanTable.status))
    } catch (error) {
      console.error('Error fetching karyawan:', error)
      throw new Error('Failed to fetch karyawan')
    }
  },

  async getKaryawanById(id: number): Promise<Karyawan | undefined> {
    try {
      const [karyawan] = await db
        .select()
        .from(karyawanTable)
        .where(eq(karyawanTable.ID, id))
      return karyawan
    } catch (error) {
      console.error(`Error fetching karyawan with ID ${id}:`, error)
      throw new Error('Failed to fetch karyawan')
    }
  },

  async updateKaryawan(
    id: number,
    karyawanData: Partial<KaryawanInput>
  ): Promise<Karyawan | undefined> {
    try {
      const [updatedKaryawan] = await db
        .update(karyawanTable)
        .set(karyawanData)
        .where(eq(karyawanTable.ID, id))
        .returning()
      return updatedKaryawan
    } catch (error) {
      console.error(`Error updating karyawan with ID ${id}:`, error)
      throw new Error('Failed to update karyawan')
    }
  },

  async deleteKaryawan(id: number, isHardDelete = false): Promise<boolean> {
    try {
      if (isHardDelete) {
        const result = await db
          .delete(karyawanTable)
          .where(eq(karyawanTable.ID, id))
        const rowsAffected = result.rowCount ?? 0

        if (rowsAffected > 0) {
          console.log(`Karyawan with ID ${id} hard-deleted successfully.`)
          return true
        } else {
          console.log(`No karyawan found with ID ${id}. Hard deletion failed.`)
          return false
        }
      } else {
        const result = await db
          .update(karyawanTable)
          .set({ status: false }) // Soft delete by setting status to false
          .where(eq(karyawanTable.ID, id))
        const rowsAffected = result.rowCount ?? 0

        if (rowsAffected > 0) {
          console.log(`Karyawan with ID ${id} soft-deleted successfully.`)
          return true
        } else {
          console.log(`No karyawan found with ID ${id}. Soft deletion failed.`)
          return false
        }
      }
    } catch (error) {
      console.error(`Error deleting karyawan with ID ${id}:`, error)
      throw new Error('Failed to delete karyawan')
    }
  }
}
