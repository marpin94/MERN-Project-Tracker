import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/GlobalState'

import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'

import Menu from '../images/Menu'

export const TaskCard = ({task, getTasks, currentProject}) => {

    const {deleteTask, setTasks, getProjects} = useContext(UserContext)

    const [border, setBorder] = useState('info')
   

    const handleDelete = () => {
        deleteTask(currentProject._id, task)
        getProjects()

        setTasks(currentProject.tasks)
        getTasks(currentProject._id)
    }

    const setComplete = () => {
        setBorder('success')
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
                <Card.Title>{task.taskTitle}</Card.Title>
                <Card.Body>
                    <Card.Text className = 'task-description'>
                    {task.complete ? 'Task Completed':task.taskDescription} 
                    </Card.Text>
                </Card.Body>
                <Dropdown>
                    <Dropdown.Toggle variant='info'>
                        <Menu /> 
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant = 'dark'>
                        <Dropdown.Item  onClick = {() => handleDelete()}> Delete Task </Dropdown.Item>
                        <Dropdown.Item> Edit Task </Dropdown.Item>
                        <Dropdown.Item onClick = {() => handleComplete()}> Mark Complete </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card>

    )
}
