const mongoDb = require("../config/dbConn");
var ObjectId = require("mongodb").ObjectId;
const db = mongoDb.getDb();
const Quotes = "quotes";
const getAllQuotes = (req, res) => {
    db.collection("quotes")
        .find()
        .toArray((err, results) => {
            if (err) return console.log(err);
            res.send(results);
        });
};
const addNewQuote = (req, res) => {
    console.log(req.body);
    db.collection(Quotes)
        .insertOne(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => console.error(error));
};
const updateQuote = (req, res) => {
    db.collection(Quotes)
        .findOneAndUpdate({ _id: ObjectId(req.body.id) }, {
            $set: {
                name: req.body.name,
                quote: req.body.quote,
            },
        }, {
            upsert: true,
        })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => console.error(error));
};
const deleteQuote = (req, res) => {
    db.collection(Quotes)
        .deleteOne({ _id: ObjectId(req.body.id) })
        .then((result) => {
            res.json(`Deleted` + result + ` quote`);
        })
        .catch((error) => console.error(error));
};

module.exports = { getAllQuotes, addNewQuote, updateQuote, deleteQuote };