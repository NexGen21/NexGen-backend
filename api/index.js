require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const contactRoutes = require('./contactRoutes')
const cors = require('cors');

app.use(express.json());

app.use(
    cors({
        origin: ['https://nexgendesigns.vercel.app'], // Add your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allow all HTTP methods
        credentials: true,
    })
);

// app.use(cors({
//     origin: (origin, callback) => {
//         const allowedOrigins = ['https://nexgendesigns.vercel.app','https://nexgendesignsbackend.vercel.app', 'http://localhost:3000'];

//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// }));

// app.use(cors({
//     origin: "https://nexgendesignsbackend.vercel.app/"
// }))

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
app.use('/api/contact', contactRoutes);
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

module.exports = app;