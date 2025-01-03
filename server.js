require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const contactRoutes = require('./api/contactRoutes')
const cors = require('cors');
const { configDotenv } = require('dotenv');

app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['https://nexgendesignsbackend.vercel.app', 'http://localhost:3000'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// app.use(cors({
//     origin: "https://nexgendesignsbackend.vercel.app/"
// }))

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
app.use('/api/', contactRoutes);
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Hello from Express!' });
});

// Connecting to database
mongoose.connect('mongodb+srv://sarthak:sarthak@nexgen.doemdgx.mongodb.net/?retryWrites=true&w=majority&appName=NexGen')
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Connected to database. Listening to port.");
        })
    })
    .catch(error => {
        console.log(error);
    })