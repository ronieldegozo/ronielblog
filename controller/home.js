const Story = require('../model/Story');
const {formatDate, truncate,stripTags,editIcon} = require('../helper/ejs');
//get home page for student
exports.getHome = async (req, res) =>{

    try{
        const stories = await Story.find({status: 'public'})
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean()

        res.render('home/home', {
            pageTitle: 'Blogs',
            user: req.user,
            stories,
            formatDate,
            truncate,
            stripTags,
            editIcon
        });
            
    }catch(err){
        console.log(err);
        res.render('404', {
            pageTitle: 'Page not Found'
        });
    }

}


//get user dashboard
exports.getDashboard = async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        .populate('user')
          res.render('home/dashboard', {
              pageTitle: 'Dashboard',
              user: req.user,
              stories,
              path: '/dashboard',
              formatDate
          })
      }catch (err) {
            console.log(err);
            res.render('404', {
                pageTitle: 'Page not Found'
            });
      }
}

