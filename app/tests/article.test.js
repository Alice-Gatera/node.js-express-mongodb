
//During the test env variable is set to test
process.env.NODE_ENV = 'test'

const mongoose = require("mongoose")
const Article = require('../models/articles.model.js');
const dotenv = require ('dotenv').config()

//Require the dev-dependencies
const server = require ("../../server");
const chai = require("chai");
const should = chai.should();
// const expect =chai.expect();
const fs = require('fs');
const chaiHttp = require("chai-http");

chai.use(chaiHttp)

// to hold the token
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJiOTBhZDZhYWI1YjAwMDhmNTI0ZWMiLCJpYXQiOjE2MDYxMjc5MTR9.5PE7LQvRmzjWX2cistKhHtIS8PrFVSpmJPI9Lvr3ic4"
const articleId =""
//Our parent block
describe('Articles',() =>{


    it('GET /article should get all the articles', (done)=>{
        chai.request(server)
        .get('/article')
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.have.property('message').eql('success')
            res.body.articles.should.be.a('array')
            done()
        })
    })

    it('POST/it should Post an article', (done)=>{
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

    it ('it should get  an article by the given id',(done)=>{
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
// //Test the PUT :id route
//     it('it should update an article given id', (done)=>{
//      const article ={
//          title:"big",
//          imageUrl:"good",
//          snippet: "big boss",
//          body:"as big as it can"
//      }
//                     chai.request(server)
//                     .put('/article/' + articleId)
//                     .set('auth-token',token)
//                     .send({title:"Java basics",imageUrl:"wow",snippet:"java",body:" Hardest programming language"})
//                     .send(article)
//                     .end((err,res)=>{
//                         res.should.have.status(201)
//                         res.body.should.be.a('object')
//             })
//         })
//         it('It should not update an article with an invalid id', (done)=>{
//             chai.request(server)
//             .put("article" +'5fc0e5fc44567d26c8e01238')
//             .set('autho-token', token)
//             .end((err,res)=>{
//                 res.should.have.status(200)
//                 res.body.should.be.a('object')
//                 res.body.should.property('error').eql('invalid article id')
//         })
//     })

//Test Delete: id route

//     it('it should Delete an article given the id', (done)=>{
//         let article = new Article({title:"node",imageUrl:"fantastic",snippet:"node.js",body:"helps to run the javascript code on server"})
//         article.save((err,article) =>{
//             chai.request(server)
//             .delete('/article/' + articleId)
//             .set('auth-token', token)
//             .end((err,res)=>{
//                 res.should.have.status(200)
//                 res.body.should.be.a('object')
//                 res.body.should.have.property('message').eql('article successful deleted!')
//                 done()
//     })
// })
//     })
// })
})