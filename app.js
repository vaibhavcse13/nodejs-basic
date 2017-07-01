var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app  = express();
var progLanguage = [
    {
        term: "C++",
        defined: "Language of programmer"
    },
    {
        term: "Javascript",
        defined: "King of web scripting"
    },
    {
        term: "Python",
        defined: "Language of data scientist"
    }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false }));

// for loging the request on console middleware run before requesting 
app.use(function(req , res , next ){
	console.log(`${req.method} request for ${req.url} - ${JSON.stringify(req.body)}`);
	next();

});

app.use(express.static("./public"));
app.use(cors());
app.get("/dictionary-api", function(req, res) {
	res.json(progLanguage);
});

// post route 
app.post("/dictionary-api" , function (req , res ) {
	/* body... */
	progLanguage.push(req.body);
	res.json(progLanguage);
});

app.delete("/dictionary-api/:terms" , function (req , res ) {
	/* body... */
	progLanguage = progLanguage.filter(function (defination) {
		/* body... */

		return defination.term.toLowerCase() !==  req.params.terms.toLowerCase();
	});

	res.json(progLanguage);
});
app.listen(3000);

console.log("express running on 3000");

module.exports = app;
