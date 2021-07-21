exports.getMe = async (req, res) =>{

    try{
        res.render('home/me',{
            pageTitle: 'Roniel'
        })
    }catch(err){
        console.log(err);
        res.render('404', {
            pageTitle: 'Page not Found'
        });
    }

}
