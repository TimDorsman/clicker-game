const express = require('express');
const ejs = require('ejs');
const app = express();
const server = require('http').createServer(app);
const { assetsList } = require('./server/data/assets.json');

app.use(express.static('public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

require('./server/routes')(app);
const port = process.env.SERVER_PORT || 3000;

const Inventory = require('./server/utils/inventory');
const LevelTracker = require('./server/utils/user/progress/level-tracker');

const inventory = new Inventory();
const levelTracker = new LevelTracker();

app.get('/', async (_, res) => {
	res.render('index.ejs')
});


app.get('/clicker', async (_, res) => {
	res.render('clicker.ejs', {
		assetsList,
		inventory: inventory.getOres(),
		level: {
			progress: levelTracker.getProgress(),
			stage: levelTracker.getStage(),
			experience: levelTracker.getExperience(),
			minimumExperience: levelTracker.getMinimumExperience(),
		}
	})
})

app.get('/p/inventory', async (req, res) => {
	ejs.renderFile('views/partials/inventory-list.ejs', {
		inventory: inventory.getOres(),
	}, (err, html) => {
		if(err) {
			console.error(err);
			return;
		}
		res.send({data: html});
	})

})

server.listen(port, undefined, () => {
	console.log(`[SERVER] - Server started on http://localhost:${port}`);
})
