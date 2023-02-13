const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const customizeRoutes = require('./routes/customize')

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/customize', customizeRoutes);


app.listen(8080, function() {
  console.log(`Listening on ${PORT}`)
})