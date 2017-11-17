const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOURL, {useMongoClient:true});

let db = mongoose.connection;
db.on("error", (err)=> {
  console.log(err);
});
db.on("open", ()=> { console.log("mongo connected"); })

const StockSchema = new mongoose.Schema({
  name:String,
  data:[[Number]],
  color:String,
  __v: { type: Number, select: false}
});

let StockModel = mongoose.model("stockapp", StockSchema);

module.exports.findAll = (callback)=> {
  StockModel.find({},{'_id': 0}, (callback));
}
module.exports.deleteAll = (callback)=> {
  StockModel.remove({}, callback);
}
module.exports.deleteOne = (name, callback)=> {

  StockModel.findOneAndRemove({name:name}, (callback));
}
module.exports.createOne = (name, data, color, callback)=> {
  let _StockModel = new StockModel({
    name:name,
    data:data,
    color:color
    });
  _StockModel.save(callback)
}