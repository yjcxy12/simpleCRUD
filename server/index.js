import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views', path.join(__dirname, './'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, './public')));
app.use('/', routes);

// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    }
    console.info(`==> Listening on port ${port}.`);
});
