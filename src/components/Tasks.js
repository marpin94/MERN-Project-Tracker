import React, {useContext, useState } from 'react'
import UserContext from '../context/GlobalState'
import { TaskCard } from './TaskCard'
import { AddTaskModal } from './AddTaskModal'

import axios from 'axios'






//Task page showing unique tasks for each project, will include description and priority

export const Tasks = () => {


    const {setTasks, currentProject, setCurrentProject,} = useContext(UserContext)

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
                <h4 className='main-header'>{currentProject.title}</h4>
                {show? '': <AddTaskModal show={show} setShow={setShow} currentProject = {currentProject} getTasks={getTasks} />}
                <p className = 'main-header'>{currentProject.description}</p>
                <ul className = 'task-card-container'>{Object.keys(currentProject).length === 0 ? '':currentProject.tasks.map(task => <TaskCard task ={task} currentProject = {currentProject} getTasks={getTasks}/>)}</ul>               
            </div>
    )
}
