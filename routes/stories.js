const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const {getStories,postStories,getSingleStory,getAllUserStory,getEditPost,updatePost,deletePost} = require('../controller/stories');

//get add page stories
router.get('/add',ensureAuth, getStories);

//get post  stories
router.post('/',ensureAuth, postStories);

//get single story
router.get('/:id', getSingleStory);

//get all story from a user
router.get('/user/:userId', getAllUserStory);

// GET EDIT POST
router.get('/edit/:id',ensureAuth, getEditPost);

//UPDATE STORIES
router.put('/:id',ensureAuth, updatePost);

//Delete STORIES
router.delete('/:id',ensureAuth, deletePost);

module.exports = router;
