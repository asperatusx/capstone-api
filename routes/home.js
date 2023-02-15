const express = require('express');
const router = express.Router();
const fs = require('fs');

function getResume() {
  const resumeFromFile = fs.readFileSync('./data/resume.json');
  return JSON.parse(resumeFromFile);
}

function getResumeById(id) {
  const resumeFromFile = fs.readFileSync('./data/resume.json');
  const resumes = JSON.parse(resumeFromFile);
  return resumes.find(resume => resume.id === id)
}

router.get('/:id', (req, res) => {
  const isCurrent =  req?.user?.id === req.params.id

  const resume = getResumeById(req.params.id);
  console.log(resume)
  res.json({resume, isCurrent} ) ;
})

router.delete('/:id', (req, res) => {
  const resumeList = getResume();
  const resume = resumeList.find(resume => resume.id === req.user.id);

  if (req.body.skill) {
    const index = resume.skills.indexOf(req.body.skill);
    resume.skills.splice(index, 1);
  }
  if (req.body.key) {
    const filter = (element) => element.id ===req.body.key;
    const index = resume.projects.findIndex(filter);
    resume.projects.splice(index, 1);
  }
  
  fs.writeFileSync('./data/resume.json', JSON.stringify(resumeList));
  res.sendStatus(201);
})




module.exports = router;