import React, { useEffect, useContext, useState } from 'react'
import { TaskCard } from './TaskCard'
import { Link, useHistory } from 'react-router-dom'

import UserContext from '../context/GlobalState'

import axios from 'axios'

import  Button  from 'react-bootstrap/Button'
import  Card  from 'react-bootstrap/Card'


import { motion } from "framer-motion";
import { AddTaskModal } from './AddTaskModal'

//Task page showing unique tasks for each project, will include description and priority

export const Tasks = () => {

    // const location = useHistory();

    const {setTasks, tasks, currentProject, setCurrentProject, projects, getProjects} = useContext(UserContext)

    // //Modal State 
    const [show, setShow] = useState(false)

    const getTasks =  (id) => {
        axios.get('/Projects/getTasks/'+id)
        .then(response => setCurrentProject(response.data)
        )
        .catch(err => {
          console.log(err)
        })
    
       setTasks(currentProject.tasks)
     }


    return (
            <div className = 'tasks'>
                <h1 className='main-header'>Tasks </h1>
                {show? '': <AddTaskModal show={show} setShow={setShow} currentProject = {currentProject} getTasks={getTasks} />}
                <h3>{Object.keys(currentProject).length === 0 ? '':currentProject.tasks.map(task => <TaskCard task ={task} currentProject = {currentProject} getTasks={getTasks}/>)}</h3>               
            </div>
    )
}
