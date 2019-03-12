const express = require('express');

const { body } = require('express-validator/check');

const feedController = require('../controllers/feed');

const router = express.Router();


// GET => /feed/post
router.get('/posts', feedController.getposts);

router.post('/post', [
    body('title')
    .trim()
    .isLength({min: 5}),
    body('content')
    .trim()
    .isLength({min: 5})
], feedController.createPost);

router.get('/post/:postId', feedController.getpost);

module.exports = router;