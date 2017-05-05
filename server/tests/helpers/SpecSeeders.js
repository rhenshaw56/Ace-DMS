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
      SpecFakers.privateDocument,
      SpecFakers.privateDocument1,
      SpecFakers.privateDocument2,
      SpecFakers.privateDocument3,
      SpecFakers.publicDocument,
      SpecFakers.publicDocument1,
      SpecFakers.publicDocument2,
      SpecFakers.publicDocument3,
      SpecFakers.roleDocument,
      SpecFakers.roleDocument1,
      SpecFakers.roleDocument2,
      SpecFakers.roleDocument3
    ];
    return db.Document.bulkCreate(documents, { individualHooks: true });
  }
}
