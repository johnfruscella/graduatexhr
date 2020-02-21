require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');



app.use("/", express.static("public"));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(process.env.DB_CONNECTION, options);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database...'))

app.use(express.json());

const graduatesRouter = require("./routes/graduates");

app.use("/api/graduates", graduatesRouter);


const port = process.env.Port || 5000;
app.listen(port, () => console.log(`listening on ${port}...`));