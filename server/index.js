const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cartRouter = require('./routers/cartRouter');
const userRouter = require('./routers/usersRouter');
const paymentsRouter = require('./routers/paymentsRouter');
const productRouter = require('./routers/productRouter');
const authRouter = require('./routers/authRouter');

const app = express();

app.use(express.json({ limit: '10kb' }));

dotenv.config({ path: './.env' });

app.use('/cart', cartRouter);
app.use('/users', userRouter);
app.use('/payments', paymentsRouter);
app.use('/products', productRouter);
app.use('/auth', authRouter);

mongoose
    .connect(process.env.MONGO_URI)
    .then(_ => console.log('connected to mongo'));

const port = process.env.PORT || 8000;

app.listen(port, 'localhost', () => {
    console.log(`listening on localhost:${port}`);
});