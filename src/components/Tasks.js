import React, { useEffect, useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import UserContext from '../context/GlobalState'

import axios from 'axios'

import  Button  from 'react-bootstrap/Button'
import  Card  from 'react-bootstrap/Card'


import { motion } from "framer-motion";
import { AddTaskModal } from './AddTaskModal'

//Task page showing unique tasks for each project, will include description and priority

export const Tasks = ({match}) => {

    const location = useHistory();

    const {tasks, getTasks, projects} = useContext(UserContext)

    // //Modal State 
    const [show, setShow] = useState(false)

    const projectId = match.params.id

    const pageProject = projects.filter(project => 
        project._id == projectId
    )

    const projectTasks = tasks.filter(task => {
        return(task.projectId == projectId)
    })



    // const loadTaskList = () => {
    //     axios.get('/Tasks')
    //     .then(response => {
    //         setTasks(response.data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

    useEffect(() => {
        console.log(location)                      
    }, [])

    return (
        <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.25 }}
        >
            <div>
                {projects.length > 0? <h1 className='main-header'>{pageProject[0].title}</h1> : ''}
                {show? '': <AddTaskModal show={show} setShow={setShow} id ={projectId} getTasks={getTasks}/>}
                <ul className='projects'>
                    { projectTasks &&
                        projectTasks.map(task => {
                            return(
                                <Card border='info'>
                                    <Card.Title>{task.title} </Card.Title>
                                    <Card.Body>{task.priority}</Card.Body>
                                </Card>
                            )
                        })
                    }
                </ul>
                <Link to = '/'><Button variant ='primary'>Home</Button></Link>
            </div>
        </motion.div>
    )
}
