const port = process.env.PORT || 8000;      
const ShortUrl = require('./models/shortUrl')
const mongoose = require('mongoose');

const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/urlShortener', {      // lets app use db model without connection to mongoDB 
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')       // view engine helps in embedding js in html
app.use(express.urlencoded({ extended: false }))    // to parse incoming req to urlencode payload 

// this is for home page of application 
// this will load all short urls from DB to index page 
app.get('/', async (req, res) => {           // 
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
})

// after submit btn is clicked it will store the original url to db and redirect back to index page
app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })

    res.redirect('/')
})

// this fun will check if url contains shorturl 
// if present and valid then it will redirect to corresponding full/original link
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null)
        return res.sendStatus(404)

    shortUrl.save()
    res.redirect(shortUrl.full)
})

//  used to bind and listen the connections on the specified host and port
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})
