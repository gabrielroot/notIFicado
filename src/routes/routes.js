const {Router} = require('express')
const routes = Router()
const news = require('../controller/News')

routes.get('/', news.index) //controler / retornara uma lista de noticias
routes.get('/sobre', news.sobre) //controler / retornara uma lista de noticias
routes.get('/offline', news.off) //controler / retornara uma lista de noticias
routes.post('/subscribe', news.subscribe)
routes.post('/push', news.push)

module.exports = routes