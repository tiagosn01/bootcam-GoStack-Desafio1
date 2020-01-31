const express = require('express');

const server = express();

server.use(express.json())


const projects = []

function checkUsuario(req, res, next) {
  const { id } = req.params
  const project = projects.find(p => p.id == id)

  if (!project){
     return res.status(400).json({error: 'Projeto não encontrado'})
  }
   return next()
}

function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}

server.get('/projects', logRequests, (req, res) => {  
  return res.json(projects);
})

server.post('/projects', logRequests, (req, res) => {
  const { id, title, tasks} = req.body;

  const project = {
    id, 
    title,
    tasks
  }
  projects.push(project);

  return res.json(project);
})

server.put('/projects/:id', logRequests, checkUsuario, (req, res) =>{
  const { id } = req.params;
  const { title } = req.body;
  

  const project = projects.find(p => p.id == id);
  project.title = title

  return res.json(project)

})

server.delete('/projects/:id', logRequests, checkUsuario, (req, res) => {
  const { id } = req.params
  const projectIndex = projects.find(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
})

server.post('/projects/:id', logRequests, checkUsuario, (req, res) => {
  const { id } = req.params
  const { tasks } = req.body

  const project = projects.find(p => p.id == id)

  project.tasks.push(tasks)

  return res.json(project)
})


server.listen(3000)