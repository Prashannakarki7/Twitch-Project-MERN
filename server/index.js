const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: "./configs/.env" });
const connectDB = require("./configs/db.config");
const routes = require('./routes/index');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const passport = require('passport');
const session = require('express-session');
require('./auth/passport');

//Express Server Setup
const app = express();
const port = process.env.PORT || 5555;
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

//Express Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Set to true if using HTTPS
        maxAge: 60 * 60 * 1000,  // 1 hour expiry
        sameSite: 'lax',  // Set to 'lax' or 'strict' for cross-origin cookie sharing
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Connection URL
const DB = process.env.DB_URI;
connectDB(DB);

//Server status endpoint
app.get('/', (req, res) => {
    res.send('Server is Up!');
});

// Routes
app.use("/api", routes);
// app.get('/twitch', passport.authenticate('twitch'));

//Error Handler
app.use(errorHandlerMiddleware);


app.listen(port, () => {
    console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
});
