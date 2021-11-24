import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/GlobalState'

import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'

import Menu from '../images/Menu'

export const TaskCard = ({task, getTasks, currentProject}) => {

    const {deleteTask, setTasks, getProjects} = useContext(UserContext)
    
    const [showDescription, setShowDesription] = useState(false)

    const handleShow = () => {
        setShowDesription(!showDescription)
    }

    const handleDelete = () => {
        deleteTask(currentProject._id, task)
        getProjects()

        setTasks(currentProject.tasks)
        getTasks(currentProject._id)
    }

    const handleComplete = () => {
        axios.post('/Projects/updateTask/'+ currentProject._id, task)
        .then(response => {console.log(response.data)})

        getProjects()

        setTasks(currentProject.tasks)
        getTasks(currentProject._id)

    }


    return (

            <Card className = {task.complete ? 'task-card-complete': 'task-card'}>
                <Card.Body>
                    <Card.Title className ='task-title'><h5>{task.taskTitle}</h5></Card.Title>
                    <Card.Text className = {showDescription ? 'show-task-description':'task-description'} onClick = {() => handleShow()}>
                    {task.complete ? 'Task Completed':task.taskDescription} 
                    </Card.Text>
                </Card.Body>
                <Dropdown>
                    <Dropdown.Toggle variant='info' className='drop-down'>
                        <Menu /> 
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item  onClick = {() => handleDelete()}> Delete Task </Dropdown.Item>
                        <Dropdown.Item onClick = {() => handleComplete()}> Mark Complete </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card>

    )
}
