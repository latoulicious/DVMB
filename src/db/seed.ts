import { db } from './index'
import { rolesTable, karyawanTable } from './schema'

async function seedRoles() {
  try {
    const existingRoles = await db.select().from(rolesTable)
    if (existingRoles.length === 0) {
      await db.insert(rolesTable).values([
        { name: 'Superuser', description: 'Superuser' },
        { name: 'Admin', description: 'Administrator' },
        { name: 'Staff', description: 'Staff' },
        { name: 'User', description: 'User' }
      ])
      console.log('Roles seeded successfully')
    } else {
      console.log('Roles already seeded, skipping.')
    }
  } catch (error) {
    console.error('Error seeding roles:', error)
  }
}

async function seedKaryawan() {
  try {
    const existingKaryawan = await db.select().from(karyawanTable)
    if (existingKaryawan.length === 0) {
      await db.insert(karyawanTable).values([
        {
          name: 'Don Joe',
          genderEnum: 'M',
          address: '123 Main St',
          phone: '555-1234',
          email: 'john.doe@example.com',
          position: 'Staff',
          joindate: '2023-01-15',
          salary: 5000000,
          status: true,
          departmentId: 1,
          education: 'Bachelor',
          ktp: '1234567890123456'
        },
        {
          name: 'Jane Smith',
          genderEnum: 'F',
          address: '456 Elm St',
          phone: '555-5678',
          email: 'jane.smith@example.com',
          position: 'Admin',
          joindate: '2022-05-10',
          salary: 8000000,
          status: true,
          departmentId: 2,
          education: 'Master',
          ktp: '1234567890123457'
        },
        {
          name: 'Alice Johnson',
          genderEnum: 'F',
          address: '789 Oak St',
          phone: '5678901234',
          email: 'alice.johnson@example.com',
          position: 'Designer',
          joindate: '2021-07-10',
          salary: 5000000,
          status: true,
          departmentId: 3,
          education: 'Diploma',
          ktp: '3456789012345678'
        }
      ])
      console.log('Karyawan seeded successfully')
    } else {
      console.log('Karyawan already seeded, skipping.')
    }
  } catch (error) {
    console.error('Error seeding karyawan:', error)
  }
}

async function seedAll() {
  await seedRoles()
  await seedKaryawan()
  console.log('Seeding complete!')
}

seedAll()
