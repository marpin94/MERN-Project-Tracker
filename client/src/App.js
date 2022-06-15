import './App.css';
import axios from 'axios'
import {NavBar} from './components/NavBar'
import {Projects} from './components/Projects';
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
          currentProject,
          setCurrentProject,
          getProjects
          }} >
      <div className = "grid">
        <Projects />
      </div>
      </GlobalState.Provider>
    </div>
  );
}

export default App;
