import express from 'express';
import fs from 'fs'
import path from 'path'
import cookieParser from 'cookie-parser'
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Serve static files
app.get('/',(req, res) => {
    res.send('Welcome to my Fantasy Football Server!')
    res.sendFile(path.join(__dirname,'src', 'index.html'));
});

//Unknown route handler
app.use((req, res) => res.sendStatus(404));

//GEH
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occured' },
    };
    const errObj = Object.assign({}, defaultErr, err);
    return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
