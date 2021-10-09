const Story = require('../model/Story');
const {formatDate, truncate,stripTags,editIcon} = require('../helper/ejs');
const fs = require('fs');
const path = require('path');
const PDFkit = require('pdfkit')
const fileDelete = require('../util/deleteFile');


exports.getStory = async (req, res) => {
    res.render('home/stories/index',{
        pageTitle : 'Blogs',
        path: '/stories/add'
    })
}

//get home page for add getStories 
exports.getStories = async (req, res) =>{
    try {
        const stories = await Story.find({user: req.user.id}).lean()
            res.render('home/stories/add', {
              pageTitle : 'Blogs',
              user: req.user,
              stories,
              path: '/stories/add'
          })
      }catch (err) {
        console.log(err);
        const error = new Error(err); //throwing a 500 page error
        error.httpStatusCode = 500;
        return next(error);
        //   res.render('404', {
        //       pageTitle: 'Page not Found'
        //   });
      }
}

// create new stories
exports.postStories = async (req, res) => {
    console.log("This is story");

    const title = req.body.title;
    const status = req.body.status;
    const categories = req.body.categories;
    const image = req.file;
    const body = req.body.body;
    const user = req.body.user = req.user.id;
    console.log(image);

    try{
        const imageUrl = image.path; 

        const story = new Story({
            title: title,
            status: status,
            categories: categories,
            image: imageUrl,
            body: body,
            user: user,
        });
        story.save()
        .then((result) => {
            console.log(result + 'Created');
            res.redirect('/dashboard');
        })

    }catch(err){
        const error = new Error(err); //throwing a 500 page error
        error.httpStatusCode = 500;
        return next(error);
    }

}


// get single story
exports.getSingleStory = async (req, res) => {
    
    try{
        let story = await Story.findById(req.params.id)
        .populate('user')
        .lean()

        if(!story) {
            return res.render('404', {
                pageTitle: 'Page not Found'
            });
        }

        res.render('home/stories/singlestory',{
            story,
            pageTitle : 'Single Story',
            formatDate,
            stripTags,
            path: '/stories/show'
        })


    }catch(err) {
        console.log(err);
        const error = new Error(err); //throwing a 500 page error
        error.httpStatusCode = 500;
        return next(error);
        // res.render('404', {
        //     pageTitle: 'Page not Found'
        // });
    }
}


// get all user story
exports.getAllUserStory = async (req, res) => {

    try {
        const stories = await Story.find({
          user: req.params.userId,
          status: 'public',
        })
          .populate('user')
          .lean()
    
        res.render('home/home', {
          stories,
          pageTitle: 'Blogs',
          user: req.user,
          path: '/',
          formatDate,
          truncate,
          stripTags,
          editIcon
        })

      }catch(err) {
        console.log(err);
        const error = new Error(err); //throwing a 500 page error
        error.httpStatusCode = 500;
        return next(error);
        // res.render('404', {
        //     pageTitle: 'Page not Found'
        // });
    }
}

// edit post
exports.getEditPost = async (req, res) => {
    const storyId = req.params.id;
    try{
        const story = await Story.findById(storyId)
        if(!story){
            return res.redirect('/'); 
        }
        res.render('home/stories/edit', {
            pageTitle: 'Edit',
            story,
            path: '/stories/edit',
            user: req.user
        })

    }catch(e){
        console.log(e);
    }
}

// update post
exports.updatePost = async (req, res, next) => {
    const storyId = req.body.storyId;
    const updatedtitle = req.body.title;
    const updatedstatus = req.body.status;
    const updatedcategories = req.body.categories;
    const image = req.file;
    const updatedbody = req.body.body;
    console.log(image);

    try{
        const story = await Story.findById(storyId)
        if(story.user != req.user.id){
            return res.redirect('/');  
        }
        story.title= updatedtitle;
        story.status= updatedstatus;
        story.categories= updatedcategories;
        story.body= updatedbody;
        if(image){
            fileDelete.deleteFile(story.image); 
            story.image= image.path;
        }
        return story
        .save()
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/dashboard');
        })

    }catch(err){
        const error = new Error(err); //throwing a 500 page error
        error.httpStatusCode = 500;
        return next(error);
    }
 
}


// Delete post
exports.deletePost = async (req, res, next) => {

    try{
        const prodId = req.params.id;
        const story = await Story.findById(prodId)
        if(!story){
            return next(new Error('No Story Found, Please Upload a new story'));
        }
        fileDelete.deleteFile(story.image);
        return story.deleteOne({_id: req.params.id})
        .then(result => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/dashboard');
        })

    }catch(err){
        const error = new Error(err); //throwing a 500 page error
        error.httpStatusCode = 500;
        return next(error);
    }
}


exports.getInvoice = (req, res, next) =>{
    console.log('getInvoice');
    const storyId = req.params.storiesId;

    const invoiceName = 'invoice-' + storyId + '.pdf';
    const invoicePath = path.join('invoice', invoiceName)
    const pdfDoc = new PDFkit();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="' + invoiceName + '"');
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    pdfDoc.text('Hello Roniel THIS IS YOUR PDF BLOG SITE');
    pdfDoc.end();
  
};