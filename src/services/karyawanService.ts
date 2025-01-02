import { eq, and, gte, lte, like } from 'drizzle-orm'
import { db } from '../db/index'
import { karyawanTable } from '../db/schema'

type KaryawanInput = Omit<
  typeof karyawanTable.$inferInsert,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
type Karyawan = typeof karyawanTable.$inferSelect

export const karyawanService = {
  async getAllKaryawan(
    filters: Partial<Karyawan>,
    minSalary?: number,
    maxSalary?: number
  ): Promise<Karyawan[]> {
    try {
      const whereClauses = []

      if (filters.departmentId)
        whereClauses.push(eq(karyawanTable.departmentId, filters.departmentId))
      if (filters.position)
        whereClauses.push(eq(karyawanTable.position, filters.position))
      if (filters.status !== undefined)
        whereClauses.push(eq(karyawanTable.status, filters.status))
      if (minSalary) whereClauses.push(gte(karyawanTable.salary, minSalary))
      if (maxSalary) whereClauses.push(lte(karyawanTable.salary, maxSalary))
      if (filters.joindate)
        whereClauses.push(gte(karyawanTable.joindate, filters.joindate))
      if (filters.name)
        whereClauses.push(like(karyawanTable.name, `%${filters.name}%`))

      return await db
        .select()
        .from(karyawanTable)
        .where(and(...whereClauses))
    } catch (error) {
      console.error('Error fetching karyawan with filters:', error)
      throw new Error('Failed to fetch karyawan with filters')
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

  async deleteKaryawan(id: number): Promise<boolean> {
    try {
      const result = await db
        .delete(karyawanTable)
        .where(eq(karyawanTable.ID, id))

      const rowsAffected = result.rowCount ?? 0

      if (rowsAffected > 0) {
        console.log(`Karyawan with ID ${id} deleted successfully.`)
        return true
      } else {
        console.log(`No karyawan found with ID ${id}. Deletion failed.`)
        return false
      }
    } catch (error) {
      console.error(`Error deleting karyawan with ID ${id}:`, error)
      throw new Error('Failed to delete karyawan')
    }
  }
}
