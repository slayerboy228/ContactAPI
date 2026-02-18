const express = require('express');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const { config } = require('dotenv');

config({ path: ".env" });
const app = express();

const PORT = process.env.PORT || 3500;

mongoose.connect(
    process.env.MONGO_URL,
    { dbName: 'contactAPI' }
).then(() => {
    console.log('MongoDB Connected...');
}).catch((err) => {
    console.log(err.message);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => console.log('Server running on PORT: ' + PORT));