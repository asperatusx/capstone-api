const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function getResume() {
  const resumeFromFile = fs.readFileSync('./data/resume.json');
  return JSON.parse(resumeFromFile);
}

function getResumeById(id) {
  const resumeFromFile = fs.readFileSync('./data/resume.json');
  const resumes = JSON.parse(resumeFromFile);
  return resumes.find(resume => resume.id === id)
}

router.post('/', (req, res) => {
  const resumeList = getResume();
  const resume = resumeList.find(resume => resume.id === req.user.id)
  //const resume = getResumeById(req.user.id);
  console.log(req.body.skills);
  console.log(resume.skills);
  if (req.body.skills) {
    resume.skills.push(req.body.skills);
  }
  // if ((req.body.title||req.body.image||req.body.demo)) {
  //   const newProject = {
  //     id: uuidv4(),
  //     title: req.body.title || "Add a project title",
  //     image: req.body.image || "http://localhost:8080/images/project1.jpg",
  //     demo: req.body.demo || "https://www.heroku.com/"
  //   }
  //   resume.projects.push(newProject);
  // }

  fs.writeFileSync('./data/resume.json', JSON.stringify(resumeList));
  res.json(resume);
})

// router.patch('/', (req, res) => {

// })


module.exports = router;