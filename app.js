/*eslint-env node*/

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.set('trust proxy', 1) // trust first proxy 
app.use(cookieSession({
  name: 'session',
  keys: ['timy', 'wimy']
}));

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), '0.0.0.0', function() {
		  console.log("server starting on " + app.get('port'));
});

