import dotenv from 'dotenv';
import db from '../newModels';

dotenv.config();

class DMS {
  get adminRoles() {
    return db.User.findOne({ email: process.env.ADMIN_EMAIL }).roles;
  }

  static async createAdminUser() {
    const adminUser = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      userName: process.env.ADMIN_USERNAME,
      roles: process.env.ADMIN_ROLES
    };
    await db.User.create(adminUser);
  }

  static hasAdminRole(roles) {
    return roles.includes(this.adminRoles);
  }

  static async init() {
    const adminUser = await db.User.findOne({ email: process.env.adminEmail });
    console.log("adminUser", adminUser);
    if (adminUser) {
      return;
    }
    await DMS.createAdminUser();
  }
}

export default DMS;

