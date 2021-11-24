import './App.css';
import axios from 'axios'
import {NavBar} from './components/NavBar'
import {Projects} from './components/Projects';
import { Tasks } from './components/Tasks';
import { useState, useEffect } from 'react';

import GlobalState from './context/GlobalState';

function App() {

  const [projects, setProjects] = useState([])
  
  const [currentProject, setCurrentProject] = useState({})
  
  const getProjects = () => {
    axios.get('/Projects')
    .then(response => {
      setProjects(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  

  useEffect(() => {
    getProjects();
  }, [])


  return (
    <div className="app">
        <NavBar />
      <GlobalState.Provider value ={{projects,
          setProjects,
          getProjects,
          currentProject,
          setCurrentProject
          }} >
      <div className = "grid">
        <Projects />
        {Object.keys(currentProject).length === 0 ? '':<Tasks />}
      </div>
      </GlobalState.Provider>
    </div>
  );
}

export default App;
