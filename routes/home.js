const express = require('express');
const router = express.Router();
const fs = require('fs');

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






module.exports = router;