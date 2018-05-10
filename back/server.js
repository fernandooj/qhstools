'use strict';
/////////////////////////////////////////////////////////////////////////
/***** librerias necesarias para el funcionamiento de la app  **********/
/////////////////////////////////////////////////////////////////////////
let express      = require('express') 
let app          = express();
let bodyParser   = require('body-parser');
let morgan       = require('morgan');
let mongoose     = require('mongoose');
let cookieParser = require('cookie-parser');
let cookieSession = require('cookie-session')
let formidable   = require('express-form-data');
const fileUpload = require('express-fileupload');
let SocketIO     = require('./socket.js')


// importo las rutas
let empresaRuta     = require('./routes/Empresa.js')
let esctructuraRuta = require('./routes/Estructura.js')
let procesoRuta     = require('./routes/Proceso.js')
let indicadorRuta   = require('./routes/Indicador.js')
const path          = require('path');

//let mongoStore   = require('connect-mongo')(session)
/////////////////////////////////////////////////////////////////////////
/***** librerias necesarias para el login con facebook | google  *******/
/////////////////////////////////////////////////////////////////////////   
let passport = require('passport');
let flash    = require('connect-flash');

 
let http = require('http')
let server = http.Server(app)
SocketIO(server)


/////////////////////////////////////////////////////////////////////////
/***** puerto donde va a funcionar el servidor por defecto 8080  *******/
/////////////////////////////////////////////////////////////////////////
let port = process.env.port || 8081;

/////////////////////////////////////////////////////////////////////////
/********* importo el archivo de configuracion de passport   ***********/
/////////////////////////////////////////////////////////////////////////
require('./config/passport')(passport); // pass passport for configuration


// da acceso para los servicios
mongoose.Promise = global.Promise;
let config = require('./config/config.js');
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, ');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
};

//llamo al archivo de configuracion
mongoose.connect(config.database, { useMongoClient: true })

// llamo a los archivos estaticos
app.get('/:url', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/docs/index.html'));
});
app.get('/:url/:url', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/docs/index.html'));
});

app.use(express.static('../front/docs/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(allowCrossDomain);



// required for passport
app.use(cookieSession({ 
  name: 'weplan',
  keys: ['key1', 'key2'],
 
})); /// session secret

app.use(formidable.parse({ keepExtensions:true }))


/*app.use( session( {
    saveUninitialized: false,
    resave: false,
    secret: "parientico",plaplan
    store: new mongoStore( {
        mongooseConnection: mongoose.connection
    } )
} ) );*/


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 


 


// creo la ruta de las categorias
 
app.use('/x/v1/emp/empresa', empresaRuta)
app.use('/x/v1/est/estructura', esctructuraRuta)
app.use('/x/v1/pro/proceso', procesoRuta)
app.use('/x/v1/ind/indicador', indicadorRuta)
require('./routes/Users.js')(app, passport);

server.listen(port)
console.log("run in: " + port)