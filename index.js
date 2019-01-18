var express = require('express')
const scrape = require('./scrape')
var cors = require('cors')

var app = express()

app.use(cors())

app.get('/quoka', function (req, res) {
    scrape.loadQuokaList()
        .then(x => {
            res.send(JSON.stringify(x))
        })
})

app.listen(3000, function () {
    console.log('Erfolgreich auf Port 3000 gestartet.')
})
