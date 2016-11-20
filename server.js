var express = require('express');
var router = express.Router();
var app = express();

var onlineStatuses = {
  "DK83KDLFJE": { displayName: "brgishy", serverIp: "127.0.0.1", room: "hub_01" },
  "89SKDJR837": { displayName: "pauly_pants", serverIp: "127.0.0.1", room: "hub_01" }
};

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  // if (req.headers.secret !== process.env.SECRET) {
  //   res.status(500).send('Invalid Secret Key');
  // } else {
    next();  
  // }
});

router.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

router.get("/users", function (request, response) {
  
  var vls = [];
  
  for (var key in onlineStatuses) {
    vls.push(onlineStatuses[key]);
  }
  
  response.send(vls);
});

router.post("/dreams", function (request, response) {
  
  if (hasSecreteKey(request) === false) {
    response.sendStatus(400);
    return;
  }
  
  response.sendStatus(200);
});

app.use(express.static('public'));
app.use('/', router);

// setting the port this app should listin on
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
