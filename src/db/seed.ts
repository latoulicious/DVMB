import { db } from './index';
import { rolesTable } from './schema';

async function seedRoles() {
  try {
    await db.insert(rolesTable).values([
      { name: 'Superuser', description: 'Superuser' },
      { name: 'Admin', description: 'Administrator' },
      { name: 'Staff', description: 'Staff' },
      { name: 'User', description: 'User' }
    ]);
    console.log('Roles seeded successfully');
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
}

seedRoles();