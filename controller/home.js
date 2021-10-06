const Story = require('../model/Story');
const {formatDate, truncate,stripTags,editIcon} = require('../helper/ejs');
//get home page for student

const ITEMS_PAGE = 3;
let totalItems;
exports.getHome = async  (req, res) =>{

    try{
        const page = +req.query.page || 1;
        const stories = await Story.find({status: 'public'})
        .countDocuments()  
        .then((numitems) =>{
            totalItems = numitems;
            return Story.find({status: 'public'})
            .skip((page - 1) * ITEMS_PAGE) 
            .limit(ITEMS_PAGE)
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean()
        })
        .then((stories)=>{
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
                validationErrors: [], //arrayt o f errors
                currentPage: page,
                hasNextPage: ITEMS_PAGE * page < totalItems,
                hasPrevPage: page > 1,
                nextPage: page + 1,
                prevPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PAGE)
            });
        })

    }catch(err){
        console.log(err);
        const error = new Error(err); //throwing a 500 page error
        error.httpStatusCode = 500;
        return next(error);
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


