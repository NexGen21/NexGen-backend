const express = require('express')
const mongoose = require('mongoose')
const app = express();
const contactRoutes = require('./routes/contactRoutes')
const cors = require('cors')

app.use(express.json());

app.use(cors());

app.use(cors({
    origin: "https://nexgendesignsbackend.vercel.app/"
}))

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
app.use('/api', contactRoutes);

// Connecting to database
mongoose.connect('mongodb+srv://sarthak:sarthak@nexgen.doemdgx.mongodb.net/?retryWrites=true&w=majority&appName=NexGen')
    .then(() => {
        app.listen(4000, () => {
            console.log("Connected to database. Listening to port 4000");
        })
    })
    .catch(error => {
        console.log(error);
    })