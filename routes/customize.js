const express = require('express');
const router = express.Router();
const fs = require('fs');

function getSkills() {
  const skillsFromFile = fs.readFileSync('./data/skills.json');
  return JSON.parse(skillsFromFile);
}

router.post('/', (req, res) => {
  const skillsList = getSkills();
  console.log(req.body.skills);
  skillsList.skills.push(req.body.skills);
  fs.writeFileSync('./data/skills.json', JSON.stringify(skillsList));
  res.json(skillsList);
})


module.exports = router;