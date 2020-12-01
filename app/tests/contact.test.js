//During the test the env variable is set to test
process.env.NODE_ENV ="test"
const mongoose = require('mongoose')
const Contacts = require("../models/contact.model")
require("dotenv").config()

//require the dev-dependencies
const chai =require('chai')
const chaiHttp = require("chai-http")
const server = require ("../../server");
const should = chai.should()
const fs =require('fs')
const { RSA_NO_PADDING } = require("constants")

chai.use(chaiHttp)

//to hold the token
let token

//Our parent block
describe('contact route',() =>{
describe ("/contact", ()=>{
    it("should not create contacts a message without data", (done)=>{
        let conta = {}
        chai.request(server)
        .post('/contact')
        .send(conta)
        .end((err,res)=>{
            res.should.have.status(400)
            done()
        })
    })

  
it("should send message successfully", (done)=>{
        const contact ={
        name :"Sheja",
         email :"sheja@gmail.com",
        message : "how can i reach your technical team?"
        }
        chai.request(server)
        .post('/contact')
        .send(contact)
        .end((err,res) =>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            done()
})


    })
})
    })

