const { validationResult } = require('express-validator/check')

const Post = require('../models/post');


exports.getposts = (req, res, next) => {
    Post.find()
    .then(posts => {
        if(!posts) {
            const error = new Error('there are some Error in validation!');
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json({
            message: 'Your posts are found ',
            posts: posts
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
    // res.status(200).json({
    //     posts: [{
    //         _id: '5',
    //         title: 'ravinder',
    //         content: 'this is first post by rest api',
    //         imageUrl: 'images/boat.png',
    //         creator: {
    //             name: 'ravinder'
    //         },
    //         createdAt: new Date()
        
    //     }]
    // })
};


exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const error = new Error('there are some Error in validation!');
        error.statusCode = 422;
        throw error;
    }
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/boat.png',
        creator: {name: 'ravinder'}
    });
    post.save()
    .then(result => {
        res.status(201).json({
            message:"this is very cool wheather",
            post:result

        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
    
}

exports.getpost = (req, res, next) => {
    var postId = req.params.postId;

    Post.findById(postId)
    .then(post => {
        if(!post) {
            const error =  new Error("This post is not present");
            error.statusCode = 404;
            throw err;
        }
        res.status(200).json({
            message:'your content is found',
            post: post
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}