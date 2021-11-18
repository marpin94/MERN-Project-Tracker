import './App.css';
import axios from 'axios'
import {Projects} from './components/Projects';
import { Tasks } from './components/Tasks';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react';

import GlobalState from './context/GlobalState';




function App() {

  const location = useLocation(); 

  const getProjects = () => {
    axios.get('/Projects')
    .then(response => {
      setProjects(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }


  

  const deleteProject = (id) => {
    axios.delete('/Projects/'+id)
    .then(response => {console.log(response.data)})

    getProjects()

  }

  const deleteTask = async (id, task) => {
    await axios.post('/Projects/'+id, task)
    .then(response => {console.log(response.data)})

    getProjects()

    setTasks(currentProject.tasks)
  
  }

  useEffect(() => {
    getProjects();
    console.log(Object.keys(currentProject))
  }, [])


  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  const [showTasks, setSHowTasks] = useState(false)
  const [currentProject, setCurrentProject] = useState({})

  


  return (
    <div className="app">
      <GlobalState.Provider value ={{projects, setProjects, getProjects, deleteProject, tasks, setTasks, deleteTask, showTasks, setSHowTasks, currentProject, setCurrentProject}} >
        <Projects />
        <Tasks />
      </GlobalState.Provider>
    </div>
  );
}

export default App;
