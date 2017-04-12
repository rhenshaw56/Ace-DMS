import { expect } from 'chai';
import db from '../../models';
import SpecSeeders from '../helpers/SpecSeeders';
import FakeData from '../helpers/SpecFakers';

const documentDB = db.Document;

describe('Document Model: ', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
    .then(() => SpecSeeders.populateRoleTable())
    .then(() => {
      SpecSeeders.populateUserTable();
      done();
    });
  });

  after((done) => {
    db.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
  });

  describe('Create Document', () => {
    it('should allow creation of a document with public access',
    (done) => {
      const document = FakeData.publicDocument;
      documentDB.create(document)
      .then((createdDocument) => {
        expect(createdDocument.title).to.equal(document.title);
        expect(createdDocument.ownerId).to.equal(document.ownerId);
        expect(createdDocument.content).to.equal(document.content);
        expect(createdDocument.access).to.equal(document.access);
        done();
      });
    });

    it('should throw error for a document without a valid title',
    (done) => {
      const document = FakeData.alterUserDetail(
        FakeData.publicDocument,
        { title: null }
      );
      documentDB.create(document)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should throw error for a document without a valid content',
    (done) => {
      const document = Object.assign({},
        FakeData.publicDocument,
        { content: null });
      documentDB.create(document)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should throw error for a document without a valid access type',
    (done) => {
      const document = Object.assign({},
        FakeData.publicDocument,
        { access: null });
      documentDB.create(document)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should throw error for a document set to an UNKNOWN access',
    (done) => {
      const document = Object.assign({},
        FakeData.validPublicDocument,
        { access: 'guest' });
      documentDB.create(document)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should allow creation of a document with private access',
    (done) => {
      const document = FakeData.privateDocument;
      documentDB.create(document)
      .then((createdDocument) => {
        expect(createdDocument.title).to.equal(document.title);
        expect(createdDocument.ownerId).to.equal(document.ownerId);
        expect(createdDocument.content).to.equal(document.content);
        expect(createdDocument.access).to.equal(document.access);
        done();
      });
    });

    it('should allow creation of a document with a valid role',
    (done) => {
      const document = FakeData.roleDocument;
      documentDB.create(document)
      .then((createdDocument) => {
        expect(createdDocument.title).to.equal(document.title);
        expect(createdDocument.ownerId).to.equal(document.ownerId);
        expect(createdDocument.content).to.equal(document.content);
        expect(createdDocument.access).to.equal(document.access);
        done();
      });
    });
  });

  describe('Update Document', () => {
    let testDocument;
    before((done) => {
      const document = FakeData.alterUserDetail(
        FakeData.publicDocument3,
        { title: 'Update Test Document' }
      );
      documentDB.create(document)
      .then((createdDocument) => {
        testDocument = createdDocument;
        done();
      });
    });

    it('should allow update of a document title attribute', (done) => {
      const baseDocument = FakeData.publicDocument3;
      const documentUpdate = FakeData.alterUserDetail(
        baseDocument,
        { title: 'new Title' }
      );

      documentDB.update(documentUpdate, {
        where: { id: testDocument.id }
      })
      .then(() => {
        documentDB.findById(testDocument.id)
        .then((foundDocument) => {
          expect(foundDocument.title).to.equal(documentUpdate.title);
          done();
        });
      });
    });

    it('should allow update of a document content attribute', (done) => {
      const baseDocument = FakeData.publicDocument3;
      const documentUpdate = FakeData.alterUserDetail(
        baseDocument,
        { content: 'new content' }
      );

      documentDB.update(documentUpdate, {
        where: { id: testDocument.id }
      })
      .then(() => {
        documentDB.findById(testDocument.id)
        .then((foundDocument) => {
          expect(foundDocument.content).to.equal(documentUpdate.content);
          done();
        });
      });
    });

    it('should allow update of a document access attribute to a valid access',
    (done) => {
      const baseDocument = FakeData.publicDocument3;
      const documentUpdate = FakeData.alterUserDetail(
        baseDocument,
        { content: 'private' }
      );

      documentDB.update(documentUpdate, {
        where: { id: testDocument.id }
      })
      .then(() => {
        documentDB.findById(testDocument.id)
        .then((foundDocument) => {
          expect(foundDocument.access).to.equal(documentUpdate.access);
          done();
        });
      });
    });
  });

  describe('Delete Document', () => {
    let testDocument;
    before((done) => {
      const document = FakeData.alterUserDetail(
        FakeData.publicDocument2,
        { title: 'Delete Test Document' }
      );
      documentDB.create(document)
      .then((createdDocument) => {
        testDocument = createdDocument;
        done();
      });
    });

    it('should allow deletion of an existing document', (done) => {
      documentDB.destroy({
        where: { id: testDocument.id }
      })
      .then((rowsDeleted) => {
        expect(rowsDeleted).to.be.gt(0);
        done();
      });
    });

    it('should NOT allow deletion of a Non-existing document', (done) => {
      documentDB.destroy({
        where: { id: 100 }
      })
      .then((rowsDeleted) => {
        expect(rowsDeleted).to.be.equal(0);
        done();
      });
    });
  });

  describe('Read Documents', () => {
    let testDocument;
    before((done) => {
      const document = FakeData.alterUserDetail(
        FakeData.publicDocument1,
        { title: 'Read Test Document' }
      );
      documentDB.create(document)
      .then((createdDocument) => {
        testDocument = createdDocument;
        done();
      });
    });

    it('should return all documents as an array', (done) => {
      documentDB.findAll()
      .then((documents) => {
        expect(documents).to.be.instanceOf(Array);
        done();
      });
    });

    it('should return a document specified by id', (done) => {
      documentDB.findById(testDocument.id)
      .then((document) => {
        expect(document).to.be.instanceOf(Object);
        expect(document.title).to.equal(testDocument.title);
        expect(document.content).to.equal(testDocument.content);
        expect(document.access).to.equal(testDocument.access);
        done();
      });
    });

    it('should NOT return a document if the specified id does not exist',
    (done) => {
      documentDB.findById(1000)
      .then((document) => {
        expect(document).to.equal(null);
        done();
      });
    });
  });
});
