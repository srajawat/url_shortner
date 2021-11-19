const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const connectDB = require('./config/db');

// Connect to database
connectDB();
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
  res.render('index')
})



app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 3000);