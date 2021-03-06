
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

//retrieve all articles
it("FINDALL/should get all articles",(done)=>{
    chai
    .request(server)
    .get(`/article/`)
    .end((err,res)=>{
        if (err) done(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
    })
})

    //create  an article
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

    // prevent posting an empty article
    it('POST/ should not  Post an  empty article', (done)=>{
        const article = new Article({})
        article.save((err,res)=>{
            chai
        .request(server)
        .post('/article')
        .set('auth-token',token)
        .send(article)
        .end((err,res) =>{
            res.should.have.status(400) 
            // res.body.should.have.property("message").eql('something went wrong')
            done()

        })
        
        })
    });
    it('POST/ should not  Post an aricle without image', (done)=>{
            chai
        .request(server)
        .post('/article')
        .set('auth-token',token)
        .set('Content-type','multipart/form-data')
        .field('title', 'Work ')
        .field('snippet','work hard')
        .field('body', 'work hard until you feel it')
        .end((err,res) =>{
            res.should.have.status(400) 
            // res.body.should.have.property("message").eql('something went wrong')
            done()

        })
        
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
    it("should check if the article exist",(done)=>{
        const articleId ="5fc0e5fc44567d26c8e01239"
        chai
        .request(server)
        .get('/article/' + articleId)
        .end((err,res)=>{
            // if (err) done(err)
            res.should.have.status(404)
            done(err)
        })
    })
    it('Get/article should not get article with any existing id', (done)=>{

        chai.request(server)
        .get('/article/' + '5fc6a4b179beae1fb4498c')
        .end((err,res) =>{
            res.should.have.status(500) 
            res.body.should.be.a('object')
            // res.body.should.have.property('message').eql('Something went wrong')
            done()
        })
    })

    //Test the PUT :id route
    it('Put/article should not update an article with missing data', (done)=>{
        chai.request(server)
        .put('/article/' + articleId)
        .set('auth-token',token)
        .set('Content-type','multipart/form-data')
        .attach('imageUrl', fs.readFileSync("./app/images/java.jpg"), 'java.jpg')
        .end((err,res) =>{
            res.should.have.status(400) 
            // res.body.should.have.property("message").eql('imageurl cannot be empt')
            done()
        })
    });

    it('Put/article should not update an article without files', (done)=>{
        chai.request(server)
        .put('/article/' + articleId)
        .set('auth-token',token)
        .field('title', 'Work ')
        .field('snippet','work hard')
        .field('body', 'work hard until you feel it')
        .end((err,res) =>{
            res.should.have.status(400) 
            res.body.should.have.property("message").eql('imageurl cannot be empt')
            done()
        })
    });

    it('Put/article should update  article ', (done)=>{
        chai.request(server)
        .put('/article/' + articleId)
        .set('auth-token',token)
        .field('title', 'Work ')
        .attach('imageUrl', fs.readFileSync("./app/images/java.jpg"), 'java.jpg')
        .field('snippet','work hard')
        .field('body', 'work hard until you feel it')
        .end((err,res) =>{
            res.should.have.status(200) 
            res.body.should.be.a('object')
            res.body.should.have.property('_id').eql(articleId)
            done()
        })
    })

    it('Put/article should not update article with any existing id', (done)=>{
        chai.request(server)
        .put('/article/' + '5fc6a4b179beae1fb4498c89')
        .set('auth-token',token)
        .field('title', 'Work ')
        .attach('imageUrl', fs.readFileSync("./app/images/java.jpg"), 'java.jpg')
        .field('snippet','work hard')
        .field('body', 'work hard until you feel it')
        .end((err,res) =>{
            res.should.have.status(404) 
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('article does not exist')
            done()
        })
    })
    
    it('Put/article should not update article with any existing id', (done)=>{

        chai.request(server)
        .put('/article/' + '5fc6a4b179beae1fb4498c')
        .set('auth-token',token)
        .field('title', 'Work ')
        .attach('imageUrl', fs.readFileSync("./app/images/java.jpg"), 'java.jpg')
        .field('snippet','work hard')
        .field('body', 'work hard until you feel it')
        .end((err,res) =>{
            res.should.have.status(500) 
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('Something went wrong')
            done()
        })
    })
    // Test Delete: id route

    it('Delete/article should not Delete an article with any existing id', (done)=>{

        chai.request(server)
        .delete('/article/' + '5fc6a4b179beae1fb4498c89')
        .set('auth-token',token)
        .field('title', 'Work ')
        .attach('imageUrl', fs.readFileSync("./app/images/java.jpg"), 'java.jpg')
        .field('snippet','work hard')
        .field('body', 'work hard until you feel it')
        .end((err,res) =>{
            res.should.have.status(404) 
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('article does not exist')
            done()
        })
    })
    
    it('Delete/article should not delete article with any existing id', (done)=>{

        chai.request(server)
        .delete('/article/' + '5fc6a4b179beae1fb4498c')
        .set('auth-token',token)
        .field('title', 'Work ')
        .attach('imageUrl', fs.readFileSync("./app/images/java.jpg"), 'java.jpg')
        .field('snippet','work hard')
        .field('body', 'work hard until you feel it')
        .end((err,res) =>{
            res.should.have.status(500) 
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('Something went wrong')
            done()
        })
    })

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

/////////////////////////////////////////////////////

    
it('Post/comment Should create a comment', (done)=>{
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

