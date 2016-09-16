var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./config/webpack.dev');

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 3001;

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    quiet: false,
    reload: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, req.originalUrl));
});


app.listen(port, 'localhost', err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Listening at http://localhost:${port}`);
});
