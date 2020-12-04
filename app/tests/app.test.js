const dotenv = require ('dotenv').config()

//Require the dev-dependencies
const server = require ("../../server");
const chai = require("chai");
const should = chai.should();
// const expect =chai.expect();
const fs = require('fs');
const chaiHttp = require("chai-http");

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJiOTBhZDZhYWI1YjAwMDhmNTI0ZWMiLCJpYXQiOjE2MDYxMjc5MTR9.5PE7LQvRmzjWX2cistKhHtIS8PrFVSpmJPI9Lvr3ic4"

chai.use(chaiHttp)

//Our parent block

describe('App',() =>{
    it('Get/article should Post a message', (done)=>{
        chai.request(server)
        .get('/')
        .set("auth-token", token)
        .end((err,res) =>{
        if(err) done(err)
            res.should.have.status(200) 
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql("Welcome to Alice NODE.JS")
            done()
        })
    });

})