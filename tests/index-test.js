const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);

describe('API Routes', () => {

  afterEach(() =>{
    server.locals.events = [];
  });

  describe('GET /events', () => {
    it('should return all events', (done) =>{

      server.locals.events = [
        { name: 'Line Dancing', description: 'I dance!', tags: [] }
      ];
      chai.request(server)
      .get('/events')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].name.should.equal('Line Dancing');
        response.body[0].description.should.equal('I dance!');
        response.body[0].tags.should.deep.equal([]);
        done();
      });
    });
  });

  describe('POST /events', () => {
    const errorText = 'You are missing name or description or both!';

    it('should create a new event', (done) =>{
      let name = 'Naked Ice Fishing';
      let description = 'Put together a team of you and your closest friends and get ready to go naked ice fishing. Will it be cold? Yes. Will it be difficult? Yes. But you will come out of the experience a changed person. Also, you might catch fish.';
      chai.request(server)
      .post('/events')
      .send({
        name: name,
        description: description
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.name.should.equal(name);
        response.body.should.have.property('description');
        response.body.description.should.equal(description);
        response.body.should.have.property('tags');
        response.body.tags.should.deep.equal(['team', 'fishing']);
        response.body.should.have.property('id');
        response.body.id.should.be.a('string');
        chai.request(server)
        .get('/events')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].name.should.equal(name);
          response.body[0].description.should.equal(description);
          response.body[0].tags.should.deep.equal(['team', 'fishing']);
          done();
        });
      });
    });

    it('should error for missing name', (done) => {
      chai.request(server)
        .post('/events')
        .send({
          description: 'Knuth'
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal(errorText);
          chai.request(server)
            .post('/events')
            .send({
              name: undefined,
              description: 'ahoy'
            })
            .end((err, response) => {
              response.should.have.status(422);
              response.body.error.should.equal(errorText);
              done();
            });
        });
    });

    it('should error for missing description', (done) => {
      chai.request(server)
        .post('/events')
        .send({
          name: 'Knuth'
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal(errorText);
          chai.request(server)
            .post('/events')
            .send({
              name: 'Cat',
              description: undefined
            })
            .end((err, response) => {
              response.should.have.status(422);
              response.body.error.should.equal(errorText);
              done();
            });
        });
    });

    it('should error for empty string description', (done) => {
      chai.request(server)
        .post('/events')
        .send({
          name: 'Knuth',
          description: ''
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal(errorText);
          chai.request(server)
            .post('/events')
            .send({
              name: 'Cat',
              description: ''
            })
            .end((err, response) => {
              response.should.have.status(422);
              response.body.error.should.equal(errorText);
              done();
            });
        });
    });

    it('should error when nothing passed', (done) => {
      chai.request(server)
        .post('/events')
        .send({})
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal(errorText);
          done();
        });
    });

    it('should error when nothing passed', (done) => {
      chai.request(server)
        .post('/events')
        .send()
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal(errorText);
          done();
        });
    });
  });
});