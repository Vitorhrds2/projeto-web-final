// Requires
const express = require('express')
const cookieParser = require('cookie-parser')

const ConnectionService = require('./services/ConnectionService')

// Routes
const routes = require('./routes/Routes');

const port = 3001;
const app = express()

// Define onde está o banco de dados que será usado
ConnectionService.setDatabase(__dirname + '/database.db');
app.set('view engine', 'ejs')
app.set('views', __dirname + '/../Frontend')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/main', express.static(__dirname + '/../Frontend/Main'))
app.use('/dashboard', express.static(__dirname + '/../Frontend/Dashboard'))

app.use('/imagens', express.static(__dirname + '/../../imagens'))

app.use(routes)

app.listen(port, async () => {
    console.log(`Server escutando a porta ${port} http://localhost:${port}`)
})