import db from '../../models';
import SpecFakers from './SpecFakers';

export default class SpecSeeders {
  static init() {
        return db.sequelize.sync({ force: true })
        .then(() => SpecSeeders.populateRoleTable())
        .then(() => SpecSeeders.populateUserTable())
        .then(() => SpecSeeders.populateDocumentTable());
  }
  static populateUserTable() {
    const users = [
      SpecFakers.AdminUser,
      SpecFakers.RegularUser,
      SpecFakers.RegularUser1,
      SpecFakers.RegularUser2,
      SpecFakers.RegularUser3,
      SpecFakers.RegularUser4,
      SpecFakers.RegularUser5,
      SpecFakers.RegularUser6,
      SpecFakers.RegularUser7,
      SpecFakers.RegularUser8,
      SpecFakers.RegularUser9
    ];
    return db.User.bulkCreate(users, { individualHooks: true });
  }
  static populateRoleTable() {
    const roles = [
      SpecFakers.AdminRole,
      SpecFakers.RegularRole,
      SpecFakers.generateRandomRole('random')
    ];
    return db.Role.bulkCreate(roles, { individualHooks: true });
  }
  static populateDocumentTable() {
    const documents = [
      SpecFakers.PrivateDocument,
      SpecFakers.PrivateDocument1,
      SpecFakers.PrivateDocument2,
      SpecFakers.PrivateDocument3,
      SpecFakers.PublicDocument,
      SpecFakers.PublicDocument1,
      SpecFakers.PublicDocument2,
      SpecFakers.PublicDocument3,
      SpecFakers.RoleDocument,
      SpecFakers.RoleDocument1,
      SpecFakers.RoleDocument2,
      SpecFakers.RoleDocument3
    ];
    return db.Document.bulkCreate(documents, { individualHooks: true });
  }
}
