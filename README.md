# sw-body-url

Provides a middlware handler which parses `Content-Type: application/x-www-form-urlencoded` bodies into an object on `req.body`.

## Install

`npm install sw-body-url`

## Example

```javascript
var http = require('http');
var sw = require('simpleware');


var bodyurl = require('sw-body-url')({
	maxLength: 8192 // The maximum length of the body
});

app.post('/posttopath', bodyurl, function(req, res) {
	res.end(req.body.say);
});
```
