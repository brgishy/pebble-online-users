var express = require('express');
var router = express.Router();
var app = express();
var onlineUsers = {};

// returns the static index page, which lists all users (not routed)
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// gets all users currently online  (not routed)
app.get("/all_users", function (request, response) {
  
  var values = [];
  
  for (var key in onlineUsers) {
    values.push(JSON.stringify(onlineUsers[key]));
  }
  
  response.status(200).send(values);
});

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  if (req.headers.secret !== process.env.SECRET) {
     res.status(500).send('Invalid Secret Key');
  } else {
    next();
  }
});

// gets the status of the given user
router.get("/user/:id", function (request, response) {
  response.status(200).send(onlineUsers[request.params.id]);
});

// updates the status of a user, json body must have "id" property
router.post("/update_status", function (request, response) {
  
  var body = [];
  
  // getting the body request
  request.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    var status = JSON.parse(Buffer.concat(body).toString());
    onlineUsers[status.id] = status;
  });
  
  response.sendStatus(200);
});

// setting up the app to use the routing object and static files
app.use(express.static('public'));
app.use('/', router);

// starting the app
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
