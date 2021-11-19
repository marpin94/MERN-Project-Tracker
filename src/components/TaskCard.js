import React, { useContext, useEffect } from 'react'
import UserContext from '../context/GlobalState'
import Card from 'react-bootstrap/Card'

import Menu from '../images/Menu'

export const TaskCard = ({task, getTasks}) => {

    const {deleteTask, currentProject} = useContext(UserContext)



    const handleDelete = () => {
        deleteTask(currentProject._id, task)
        getTasks(currentProject._id)
    }


    return (

            <Card className = 'task-card' border='info'>
                <Card.Title>{task.taskTitle}</Card.Title>
                <Card.Body>
                    <Card.Text className = 'task-description'>
                    {task.taskDescription} 
                    </Card.Text>
                </Card.Body>
                <button onClick = {() => handleDelete()}> <Menu /> </button>
            </Card>

    )
}
