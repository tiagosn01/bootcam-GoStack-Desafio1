const express = require('express');

const server = express();

server.use(express.json())


const projects = []

server.get('/projects', (req, res) => {  
  return res.json(projects);
})

server.post('/projects', (req, res) => {
  const { id, title} = req.body;

  const newProject = {
    id, 
    title,
    tasks:[]
  }

  projects.push(newProject)

  return res.json(newProject)
})



server.listen(3000)