const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes')
const nunjucks = require('nunjucks')
const cors = require('cors')
require('dotenv/config')
const scrap = require('./src/controller/Scrap')     //recebe a função do módulo
const app = express()


const forceSsl = function (req, res, next) {   //Redirecionamento automático de HTTP para HTTPS
    if (req.headers['x-forwarded-proto'] !== 'https'  && req.hostname !== 'localhost') {
        console.log('REDIRECT HTTP > HTTPS')
        return res.redirect(['https://', req.get('Host'), req.url].join(''))
    }
    return next()
}
app.use(forceSsl)

app.use(cors({
    origin: "https://notificado.gabrielrwx.com.br"
}))

nunjucks.configure('./src/views',{
    express: app,
    noCache: !false,    //DEV
//    noCache: false,
    autoescape: false,
    web: { async: true }
})

app.set('view engine', 'njk')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json())
app.use(express.static('./src/public'))
app.use(routes)

app.listen(process.env.PORT || 9000, function(){ //5000 ou 9000
    console.log('App is Runnuing!');
})

//TIPOS DE PARÂMETROS

//QUERY PARAMS: request.query (Filtros, ordenação, paginação...)
//ROUTE PARAMS: request.params (Identificar um recurso na alteração ou remoção)
//BODY: (Dados para criação ou alteração de um registro)