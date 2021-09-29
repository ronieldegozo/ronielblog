const express = require('express');
const router = express.Router();
const {getStory} = require('../controller/stories');

//get student  home page
router.get('/story', getStory);

module.exports = router;
