const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

require('./server/routes')(app);

const port = process.env.SERVER_PORT || 3000;
app.get('/', async (req, res) => {
	res.sendFile( path.join( __dirname, 'views', '/index.html' ));
});

app.get('/clicker', async (req, res) => {
	res.sendFile( path.join( __dirname, 'views', '/clicker.html' ));
})

app.listen(port);
