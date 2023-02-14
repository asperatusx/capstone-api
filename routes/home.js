const express = require('express');
const router = express.Router();
const fs = require('fs');

function getResume() {
  const resumeFromFile = fs.readFileSync('./data/resume.json');
  return JSON.parse(resumeFromFile);
}

router.get('/', (req, res) => {
  const user = req.user
  console.log(user)
  const resume = getResume();
  res.json(resume);
})







module.exports = router;