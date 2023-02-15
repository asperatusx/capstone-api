const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const fs = require('node:fs')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const cors = require('cors');
const homeRoutes = require('./routes/home');
const customizeRoutes = require('./routes/customize');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


const jsonSecretKey = "f91e4494-04b3-4d49-8c27-57faed9e5785";

app.use((req, res, next) => {
  // Signup and login are public URLs that don't require a token
  if (req.url === "/signup" || req.url === "/login") {
    next();
  } else {
    // Format of request is BEARER <token>. Splitting on ' ' will create an
    // array where the token is at index 1
    const token = getToken(req);

    if (token && token !== 'null') {
      console.log('Auth Token:::', token==='null');
      if (jwt.verify(token, jsonSecretKey)) {
        // Decode the token to pass along to end-points that may need
        // access to data stored in the token.
        const decode = jwt.decode(token);
        const users = JSON.parse(fs.readFileSync('./data/users.json'));
        const user = users.find(user => user.username === decode.name);
        req.user = user;

   
        next();
      } else {
        res.status(403).json({ error: "Not Authorized." });
      }
    } else {
      res.status(403).json({ error: "No token. Unauthorized." });
    }
  }
});

function getToken(req) {
  return req.headers?.authorization?.split(" ")[1];
}

app.post('/signup', (req, res) => {

  const users = JSON.parse(fs.readFileSync('./data/users.json'));
  const { username, password } = req.body;

  if (username && password) {
    const newUser = {
      id: uuidv4(),
      username, password
    }
    users.push(newUser)
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
    res.sendStatus(201)
  } else {
    res.status(400).json({error: 'missing username or password'})
  }

 

})

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync('./data/users.json'));
  const user = users.find(user => user.username === username && user.password === password)

  if (user) {
    console.log('Found user:', user);
    res.json({ token: jwt.sign({ name: user.username }, jsonSecretKey), id: user.id });
  } else {
    res.status(403).json({
      token: "",
      error: {
        message: "Error logging in. Invalid username/password combination.",
      },
    });
  }
});


app.use('/', homeRoutes);
app.use('/customize', customizeRoutes);


app.listen(8080, function() {
  console.log(`Listening on ${PORT}`)
})