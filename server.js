var express = require('express');
var app = express();

var onlineStatuses = {
  "DK83KDLFJE": { displayName: "brgishy", serverIp: "127.0.0.1", room: "hub_01" },
  "89SKDJR837": { displayName: "pauly_pants", serverIp: "127.0.0.1", room: "hub_01" }
};

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/users", function (request, response) {
  
  var vls = [];
  
  for (var key in onlineStatuses) {
    vls.push(onlineStatuses[key]);
  }
  
  response.send(vls);
});

app.post("/dreams", function (request, response) {
  
  if (hasSecreteKey(request) === false) {
    response.sendStatus(400);
    return;
  }
  
  response.sendStatus(200);
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function hasSecreteKey(request) {
  return request.headers.hasOwnProperty('secrete') && request.headers.secrete === 'ec1774b1-1dcb-4ba4-bbfa-522b916f9eae';
}