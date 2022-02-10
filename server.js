// require('dotenv').config();¨
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').parse()
}

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const app = express()
var serverPort = 5000;
const port = process.env.PORT || serverPort


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

const db = mongoose.connection

db.on('error', error => {
  console.error(error)})
db.once('open', () => {
  console.log('Conected to mangoose')})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port)
// const server = app.listen(process.env.PORT || serverPort, () => {
//   const port = server.address().port;
//   console.log(`Express is working on port ${port}`);
// });
