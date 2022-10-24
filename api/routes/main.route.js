module.exports = function (app) {
	const controller = require('../controllers/main_controller');
	app.get('/', controller.rootpage);
	app.get('/api', controller.jgreetingCustomMethod);
	app.get('/api/evoting2', controller.jevotingCustomMethod);
}
 // const express = require('express');
 // const app = express();

 // app.get('/'(req,res) => {
 // 	res.send('Hello World');
 // });

 // app.get('/api/evoting2', (req,res) => {
 // 	res.send([1,2,3]);
 // });

 // app.listen(3000, () => console.log('Listening on port 3000...'));  