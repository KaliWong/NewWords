var express = require('express')
var app = express()

app.use(express.static('../Client')) // app.use: sit there and wait for a request.
// .. goes back one folder then /Client goes to the Client folder

app.listen(8080) // This server is listening to this part. computer port: 8080