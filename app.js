var restify = require('restify');
var bodyParser = require('body-parser');
var tingo = require('tingodb')();
var db = new tingo.Db('./data', {});
var comments = db.collection('comments');
var port = 8080;

app = restify.createServer();
app.use(restify.queryParser());
app.use(bodyParser.json());
restify.CORS.ALLOW_HEADERS.push('authorization');
restify.CORS.ALLOW_HEADERS.push('test');
app.use(restify.CORS());
app.use(restify.fullResponse());

app.get('/comments', function (req, res, next) {
	comments.find({}).toArray(function (err, data) {
		return res.send(data);
	});
});

app.post('/comments', function (req, res, next) {
	comments.insert({text: req.body.text}, function (err, data) {
		if (err) {
			return next(err);
		}
		return res.send(data);
	});
});

app.del('/comments/:id', function (req, res, next) {
	comments.remove({_id: req.params.id}, function (err, data) {
		if (err) {
			return next(err);
		}
		return res.send(data);
	});
});

app.get(/.*/, restify.serveStatic({
    'directory': 'assets',
    'default': 'index.html'
 }));

app.listen(port, function () {
	console.log('Server is listening on http://localhost:' + port);
});