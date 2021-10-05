const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err, file) => {
        if(err){
            console.log(err);
            throw new Error('Database Error');
        }
        
    })
};

exports.deleteFile = deleteFile;
