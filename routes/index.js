var express = require("express");
var router = express.Router();
var QuotesContoller = require("../controllers/quotes");

router.get("/", function(req, res, next) {
    res.render("index");
});
router.get("/api/getAllQuotes", QuotesContoller.getAllQuotes);
router.post("/api/addNewQuote", QuotesContoller.addNewQuote);
router.put("/api/updateQuote", QuotesContoller.updateQuote);
router.delete("/api/deleteQuote", QuotesContoller.deleteQuote);

module.exports = router;