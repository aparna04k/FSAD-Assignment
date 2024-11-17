// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Welcome to the Book Exchange Platform');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.use('/api/auth', require('./routes/auth'));


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// console.log('MongoDB URI:', process.env.MONGODB_URI);
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));


// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

// app.use(express.json());

// app.use('/api/auth', require('./routes/auth'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});


app.use(express.json());
// Use the auth routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/book'));  // Add book routes
app.use('/api/profile', require('./routes/profile'));
app.use('/api/exchange', require('./routes/exchange'));



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});

app.use('/api/', apiLimiter);

const cors = require('cors');
app.use(cors());

