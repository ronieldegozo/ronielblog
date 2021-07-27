const axios = require('axios');

exports.getNews = async (req, res) => {

    try{
        const news = await axios.get('https://newsapi.org/v2/top-headlines?country=ph&apiKey=8fbd96e6bb6e4badb1f2dd8e85fa9be0')
        res.render('home/news',{ 
            pageTitle: 'Roniel', 
            articles: news.data.articles
        })
        // console.log(news.data.articles);
    }catch(err){
        console.log(err);
        res.render('404', {
            pageTitle: 'Page not Found'
        });
    }


}