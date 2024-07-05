import express from 'express'
import { renderFile as ejsRenderFile } from 'ejs'
import { renderFile as pugRenderFile } from 'pug'
import articles from './data/articles.mjs'
import users from './data/users.mjs'

const app = express()
const PORT = 3000

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/users', (req, res) => {
  const title = 'Users list'
  res.render('users', { users, title })
})

app.get('/users/:id', (req, res) => {
  users.forEach(user => {
    pugRenderFile('./views/user.pug', {user}, (err, html) => {
      if (err) {
        return res.status(500).send('Помилка при обробці шаблону EJS')
      }
      res.send(html)
    })
  })
})

app.get('/articles', (req, res) => {
  ejsRenderFile('./views/articles/index.ejs', {articles}, (err, html) => {
    if (err) {
      return res.status(500).send('Помилка при обробці шаблону EJS')
    }
    res.send(html)
  })
})

app.get('/articles/:id', (req, res) => {
  articles.forEach((article) => {
    ejsRenderFile('./views/articles/article.ejs', {article}, (err, html) => {
      if (err) {
        return res.status(500).send('Помилка при обробці шаблону EJS')
      }
      res.send(html)
    })
  })
})

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})