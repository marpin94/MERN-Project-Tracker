import './App.css';
import axios from 'axios'
import {Projects} from './components/Projects';
import { Tasks } from './components/Tasks';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react';

import GlobalState from './context/GlobalState';

import { AnimatePresence } from 'framer-motion';

//Using React router to navigate between project and task pages. Each task page will use a unique ID and will recieve props from the projectCard component

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


  const deleteTask = (id) => {
    axios.delete('/Tasks/' +id)
    .then(response => {console.log(response.data)})

  
  }

  useEffect(() => {
    getProjects();

    console.log('App Loaded!')

  }, [location])

  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  


  return (
    <div className="App">
        <GlobalState.Provider value ={{projects, setProjects, getProjects, deleteProject, tasks, deleteTask}} >
          <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={location.pathname}>  
              <Route path='/' exact component={Projects}/>
              <Route exact path='/:id' 
                render={(props) => <Tasks {...props}/>}/>
            </Switch>
          </AnimatePresence>
        </GlobalState.Provider>
    </div>
  );
}

export default App;
