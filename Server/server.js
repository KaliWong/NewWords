var express = require('express')
var app = express()
var bodyParser = require('body-parser') 
//include the body-parser that we just downloaded through npm install body-parser --save 
var Nedb = require('nedb') // npm install nedb --save 
var database = new Nedb({ filename: './data/data.db', autoload: true })
// a server that connect to the database, save the data in a file (?)

app.use(express.static('../Client')) // app.use: sit there and wait for a request.
// .. goes back one folder then /Client goes to the Client folder

app.use(bodyParser.json())

app.post('/saveCurrent', function (req, res) {
    var data = 
    { 
    	word: req.body.word,  // word property from request.body.word
    	date: Date.now() 	  // date property
    }

	var done = function () {
    	console.log('I just wrote to the database') // this is a server.js so this mag is shown on the server side console; Terminal
    	res.end("done")
	}

	database.insert(data, done) // insert data in database and then run  

})

app.get('/getSaved', function (req, res) { // when get function is called under /getSaved address, run the following request and response functions
  // setup query and done function here
	var query = {} // get everything from the database

  	var done = function (err, data) {
    	console.log('I just read stuff from the database')
    	res.send(data)
  }

  database.find(query, done)
})


app.listen(8080) // This server is listening to this part. computer port: 8080
