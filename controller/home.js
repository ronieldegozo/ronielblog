const Story = require('../model/Story');
const {formatDate, truncate,stripTags,editIcon} = require('../helper/ejs');
//get home page for student
const Items_Per_Page = 2;
exports.getHome = async (req, res) =>{
      const page = req.query.page;
    try{
        const stories = await Story.find({status: 'public'})
  
            .skip((page - 1) * Items_Per_Page)
            .limit(Items_Per_Page)
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
            editIcon,
            path: '/',
            errorMsg: false,
            userInput: { //speciific old error
                name: '',
                email: '',
                subject: '',
                phone: '',
                message: '',
            },
            validationErrors: [] //arrayt o f errors
        });
            
    }catch(err){
        console.log(err);
        const error = new Error(err); //throwing a 500 page error
        error.httpStatusCode = 500;
        return next(error);
        // res.render('404', {
        //     pageTitle: 'Page not Found'
        // });
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
        const error = new Error(err); //throwing a 500 page error
        error.httpStatusCode = 500;
        return next(error);
            // res.render('404', {
            //     pageTitle: 'Page not Found'
            // });
      }
}


