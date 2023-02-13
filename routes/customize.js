const express = require('express');
const router = express.Router();
const fs = require('fs');

function getResume() {
  const resumeFromFile = fs.readFileSync('./data/resume.json');
  return JSON.parse(resumeFromFile);
}

router.post('/', (req, res) => {
  const resume = getResume();
  console.log(req.body.skills);
  resume.skills.push(req.body.skills);
  fs.writeFileSync('./data/resume.json', JSON.stringify(resume));
  res.json(resume);
})

// router.patch('/', (req, res) => {

// })


module.exports = router;