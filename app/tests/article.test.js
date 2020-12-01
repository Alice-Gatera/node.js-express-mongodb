
//During the test env variable is set to test
process.env.NODE_ENV = 'test'

const mongoose = require("mongoose")
const Article = require('../models/articles.model.js');
const Comment = require('../models/comments.model')
const dotenv = require ('dotenv').config()

//Require the dev-dependencies
const server = require ("../../server");
const chai = require("chai");
const should = chai.should();
// const expect =chai.expect();
const fs = require('fs');
const chaiHttp = require("chai-http");
const { request } = require("http");
const { expect } = require("chai");

chai.use(chaiHttp)

// to hold the token
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJiOTBhZDZhYWI1YjAwMDhmNTI0ZWMiLCJpYXQiOjE2MDYxMjc5MTR9.5PE7LQvRmzjWX2cistKhHtIS8PrFVSpmJPI9Lvr3ic4"

//Our parent block
const articleId ="5fc0e5fc44567d26c8e01238"
describe('Articles',() =>{
    it('POST/article should Post an article', (done)=>{
        chai.request(server)
        .post('/article')
        .set('auth-token',token)
        .set('Content-type','multipart/form-data')
        .field('title', 'Work ')
        .attach('imageUrl', fs.readFileSync("./app/images/java.jpg"), 'java.jpg')
        .field('snippet','work hard')
        .field('body', 'work hard until you feel it')
        .end((err,res) =>{
        if(err) done(err)
            res.should.have.status(200) 
            res.body.should.be.a('object')
            done()
        })
    });

    // Get an article :id route to retrieve(by id) route
    it ('Get/article should get  a specific  article by the given id',(done)=>{
        const id ="5fc0e5fc44567d26c8e01238"
        chai
        .request(server)
        .get(`/article/${id}`)
        .end((err,res)=>{
            if (err) done(err)
            res.should.have.status(200)
            res.body.should.be.a('object')
        
            done()
        })
    })
    //Test the PUT :id route
    it ('Put/ article  should  given id',(done)=>{
        let article = new Article({
            title: "java ",
            imageUrl: "wow",
            snippet:"java basics",
            body:"programming language"
        })
        article.save((err, article) =>{
            chai
            .request(server)
            .put('/article' + article.id)
            .set("auth-token", token)
            .send(article)
            .end((err,res) =>{
                res.should.have.status(404)
                res.body.should.be.a('object')
                // res.body.should.have.property('imageUrl').eql('wow')
                done()
            })
        })
    })
    // Test Delete: id route

    it('DELETE/article should Delete an article given the id', (done)=>{
        let art = new Article({title:"node",imageUrl:"fantastic",snippet:"node.js",body:"helps to run the javascript code on server"})
        art.save((err,arti) =>{
            chai.request(server)
            .delete('/article/' + arti.id)
            .set('auth-token', token)
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
        })
    })
    it('Should create a comment', (done)=>{
        const articleId ="5fc0e5fc44567d26c8e01238"
        chai
        .request(server)
        .post('/article/'+articleId+'/comment')
        .send({
            name: "Test name",
            email:"test@email.com", 
            body: "Test body",  
            article:'5fc0e5fc44567d26c8e01238'
        })
        .end((err, res)=>{
            res.body.should.be.a('object')
            done()
        })
    })
    it('Should get all comments', (done)=>{
        chai
        .request(server)
        .get('/article/'+articleId+'/comment')
        .end((err, res)=>{
            res.body.should.be.a('object')
            done()
        })
    })
    it("should update  a comment given the id",(done) =>{
        const commentId ="5fc62f2097dc83382c60f9d9"
        const comment = new Comment({
            articleId:"5fc0e5fc44567d26c8e01238",
            name:"Akimana",
            email:"akimana@gmail.com",
            body:" wow"     
   })
   comment.save ((err,comment) =>{
       chai
       .request(server)
       .put("/article/comment/"+ commentId)
       .set("auth-token", token)
       .send(comment)
       .end((err,res) =>{
           res.body.should.be.a("object")
           done()
       })
    })
})
   it("should delete a commet of a given id", (done)=>{
    const commentId ="5fc62f2097dc83382c60f9d9"
    chai
        .request(server)
        .delete('/article/comment/'+ commentId )
        .end((err, res)=>{
            res.body.should.be.a('object')
            done()
        })
    })
})
 
    
