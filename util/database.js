const mongoose =  require('mongoose');

const connectDB = async () =>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log(`Mongo DB connect on PORT ${conn.connection.host}`);
  }catch (e){
    console.log(err);
    const error = new Error(err); //throwing a 500 page error
    error.httpStatusCode = 500;
    return next(error);
    process.exit(1);
  }
}
module.exports = connectDB;