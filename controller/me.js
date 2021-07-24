const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('98e5e4e958fa47eb97c242794e4165d8');


exports.getMe = async (req, res) =>{

    // newsapi.v2.topHeadlines({
    //     language: 'en',
    //     country: 'ph',
    // })
    // .then(response => {
    //     console.log(response);
    // });
      

    try{
        newsapi.v2.topHeadlines({
            language: 'en',
            country: 'ph',
        })
        .then((response) => {
            res.render('home/me',{
                pageTitle: 'Roniel',
                response
            })

            console.log(response)
        })


   
    }catch(err){
        console.log(err);
        res.render('404', {
            pageTitle: 'Page not Found'
        });
    }

}
