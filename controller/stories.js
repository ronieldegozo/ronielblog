const Story = require('../model/Story');
const {formatDate, truncate,stripTags,editIcon} = require('../helper/ejs');


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
          res.render('404', {
              pageTitle: 'Page not Found'
          });
      }
}

// create new stories
exports.postStories = async (req, res) => {

    try{
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard');
    }catch(err) {
        console.log(err);
        res.render('404', {
            pageTitle: 'Page not Found'
        });
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
        res.render('404', {
            pageTitle: 'Page not Found'
        });
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
        res.render('404', {
            pageTitle: 'Page not Found'
        });
    }
}




// edit post
exports.getEditPost = async (req, res) =>{
    const story = await Story.findOne({
        _id: req.params.id
    }).lean()


    if (!story){
        return  res.render('404', {
            pageTitle: 'Page not Found'
        });
    }

        // check is the user is the login user
    if (story.user != req.user.id) {
        res.redirect('/')
    }else{
        res.render('home/stories/edit', {
            pageTitle: 'Edit',
            story,
            path: '/stories/edit',
            user: req.user
        })
    }

}



// update post
exports.updatePost = async (req, res) => {
    let story = await Story.findById(req.params.id).lean()

    if(!story) {
        return  res.render('404', {
            pageTitle: 'Page not Found'
        });
    }

    // check is the user is the login user
    if (story.user != req.user.id) {
        res.redirect('/')
    }else{
        story = await Story.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })
        res.redirect('/dashboard');
    }

}


// Delete post
exports.deletePost = async (req, res) => {

    try{
        await Story.remove({_id: req.params.id})
        res.redirect('/dashboard');
    }catch(err) {
        console.log(err);
        res.render('404', {
            pageTitle: 'Page not Found'
        });
    }



}