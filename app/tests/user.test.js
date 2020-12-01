process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const User = require('../models/User.Model')
const request = require ('request')
const { expect } = require('chai')

// const should = chai.should()
chai.use(chaiHttp)
const newUser = {
    fullName :"Test name",
    email: 'test@email.com',
    password:'mypassword'
}
describe('Authentication',() =>{
    before((done)=>{
        // User.remove({},(err)=>{
            User.create(newUser, (err, user)=>{
                done()
            })
        // })
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
    it("should login successfully", (done)=>{
        const login ={
            email: newUser.email,
            password: newUser.password
        }
        chai
        .request(server)
        .post('/auth/signIn')
        .send(login)
        .end((err,res) =>{
            expect(res).to.have.status(200)
            done()
        })
    })
    it("should not login",(done) =>{
        const login ={
            email: newUser.email,
        }
        chai
        .request(server)
        .post('/auth/signIn')
        .send(login)
        .end((err,res) =>{
            expect(res).to .have.status(400)
            done(err)

        })
    })
    after(done=>{
        User.remove({},(err)=>{
            done()
        })
    })
})