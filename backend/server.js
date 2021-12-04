import cors from 'cors';
import express from 'express';
import auth from './routes/auth/routes.js';
import users from './routes/users/routes.js';
import mongoose from 'mongoose';
import configDB from './config/database.js';
import cookieParser from 'cookie-parser';

mongoose.connect(configDB.url, {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => { console.log('MongoDB is connected') })
.catch(err => {
  console.log('MongoDB connection unsuccessful');
  console.log(err)
});


const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: ['http://test.mydomain.com:3000', 'http://localhost:3000']}));

// Mount REST on /api
app.use( '/auth', auth );
app.use( '/users', users );

app.use(function (err, req, res, next) {
  console.log('INSIDE ERROR HANDLER')
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({msg: 'invalid token...'});
  }
});


const port = process.env.PORT || 8000;

app.listen(port, () =>
	console.log(`Express app listening on localhost:${port}`)
);