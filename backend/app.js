let express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors');

let apiRoute = require('./routes/api');

app.use(cors());
app.use(express.json());

app.use('/api', apiRoute);

app.get('/', (req, res) => {
    res.send('');
});

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to database!');
});

let server = app.listen(8080, () => {
    console.log('Started server!');
});

module.exports = app;