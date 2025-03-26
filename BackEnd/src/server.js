// src/server.js
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const clipartRoutes = require('./routes/clipartRoutes');
const designRoutes = require('./routes/designRoutes');
const stockRoutes = require('./routes/stockRoutes');
const customDesignRoutes = require('./routes/customtshirtdesignRoutes');

const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000; // This should already be correct

// Security Middleware
app.use(helmet());
app.use(cors());

// Middleware to parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection (Ensure this is only in server.js)
const databaseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/development-database";
mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Database connected successfully!"))
.catch(error => console.error("❌ Database connection error:", error));

function generateJWT(userDetailsObj) {
    return jwt.sign(userDetailsObj, process.env.JWT_SECRET, { expiresIn: "7d"});
}

const validateBasicAuth = (request, response, next) => { 

    // Assign the header to something easier to work with, if it exists.
    let authHeader = request.headers["authorization"] ?? null;

    // If no auth header provided, stop the request.
    if (authHeader == null) {
        throw new Error("No auth data detected on a request to a protected route!");
    }

    // Confirm it's a Basic auth string, 
    // and store only the encoded string.
    if (authHeader.startsWith("Basic ")) {
        authHeader = authHeader.substring(5).trim();
    }

    // Decode the string.
    let decodedAuth = Buffer.from(authHeader, 'base64').toString('ascii');

    // Convert it into a usable object.
    let objDecodedAuth = {username: '', password: ''};
    objDecodedAuth.username = decodedAuth.substring(0, decodedAuth.indexOf(":"));
    objDecodedAuth.password = decodedAuth.substring(decodedAuth.indexOf(":") + 1);

    // Attach the object to the request
    request.userAuthDetails = objDecodedAuth;

    // Call the next step in the server's middleware chain or go to the route's callback.
    next();
}

// Make sure a route uses that new middleware! Like so: 
app.get('/', validateBasicAuth, (request, response) => {
    console.log(request.headers);

    // Pass the header auth data along to the JWT generator
    const userJWT = generateJWT(request.userAuthDetails)

    // Return the JWT to the client
    response.json({
        freshJWT: userJWT
    });
});

const validateJWT = (request, response, next) => {
    let suppliedToken = request.headers.jwt;
    console.log(suppliedToken);

    // jwt.verify(token, secret, callback function);
    jwt.verify(suppliedToken, process.env.JWT_SECRET, (error, decodedJWT) => {
        if (error) {
            console.log(error);
            throw new Error("User not authenticated.");
        }

        request.decodedJWT = decodedJWT;
    });

    next();
}

app.get('/someProtectedRoute', validateJWT, (request, response) => {
    response.json({
        decodedJWT: request.decodedJWT
    })
})

// Registering routes (from index.js)
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);
app.use('/cliparts', clipartRoutes);
app.use('/designs', designRoutes);
app.use('/stocks', stockRoutes);
app.use('/custom-designs', customDesignRoutes);

// Database Health Check
app.get("/databaseHealth", (req, res) => {
    const databaseState = mongoose.connection.readyState;
    const databaseName = mongoose.connection.name;
    const databaseModels = mongoose.connection.modelNames();
    const databaseHost = mongoose.connection.host;
    res.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    });
});

// Root Route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to MerchStand!" });
});

// Catch-All Route for Undefined Endpoints (Ensure This is the LAST Route)
app.get('*', (req, res) => {
    res.status(404).json({
        message: "No route with that path found!",
        attemptedPath: req.path
    });
});

// Start the server (only in server.js, not in index.js)
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    });
}

module.exports = { app };
