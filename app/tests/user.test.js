process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const User = require('../models/User.Model')
const request = require ('request')
const { expect } = require('chai')

// const should = chai.should()
chai.use(chaiHttp)
const user = {
    fullName :"KALIZA",
    email: 'kaliza15@gmail.com',
    password:'kaliza1'
}
describe('Authentication',() =>{
    before((done)=>{
        User.deleteOne({email: user.email}).then(()=>{
            console.log('User deleted');
            done()
        }).catch((err)=>{
            console.log(err);

        })
    })
    it('should  register a user',(done)=>{
        chai.request(server)
        .post('/auth/register')
        .send(user)
        .end((err, res) =>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('user')
            done()
        })
    })
    it('should not register a user',(done)=>{
        chai.request(server)
        .post('/auth/register')
        .send({fullName :"KALIZA",
        password:'alice2020'})
        .end((err, res) =>{
            res.should.have.status(400)
            res.body.should.be.a('object')
    
            done()
        })
    })

    it('should not users with the same email',(done)=>{
        chai.request(server)
        .post('/auth/register')
        .send(user)
        .end((err, res) =>{
            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('Email already exists')
            done()
        })
    })
    it('should not signup without email',(done)=>{
        chai.request(server)
        .post('/auth/register')
        .send({
            name:"alice",
            password:"alice2020"
        })
        .end((err, res) =>{
            res.should.have.status(400)
            done()
        })
    })
    it('should not signup with invalid email',(done)=>{
        chai.request(server)
        .post('/auth/register')
        .send({
            name:"alice",
            email: "alicegateragmail.com",
            password:"alice2020"
        })
        .end((err,res)=>{
            res.should.have.status(400)
            done()
        })
    })
    
    it('It should LOGIN a user', (done) => {
        chai.request(server)
        .post('/auth/signIn')
        .send({email: user.email, password: user.password})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
            res.body.should.have.property('token')
            token = res.body.token
            done()
        })
    })
    it('It should NOT LOGIN a user', (done) => {
        chai.request(server)
        .post('/auth/signIn')
        .send({email:user.email, password: user.name})
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("Email and password are incorrect")
            done();
        })
    })

    
})