const express = require('express');
const router = express.Router();
const {getNews} = require('../controller/news');

//get student  home page
router.get('/news', getNews);

module.exports = router;
