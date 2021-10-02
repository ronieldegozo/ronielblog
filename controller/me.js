const axios = require('axios');
exports.getMe = async (req, res) =>{
    try{
        // const news = await axios.get('https://newsapi.org/v2/top-headlines?country=ph&apiKey=8fbd96e6bb6e4badb1f2dd8e85fa9be0')
        res.render('home/me',{ 
            pageTitle: 'Roniel', 
            // articles: news.data.articles
        })
        // console.log(news.data.articles);
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
