import React, { useContext, useEffect } from 'react'
import UserContext from '../context/GlobalState'
import Card from 'react-bootstrap/Card'
import XCircle from '../images/XCircle'

import axios from 'axios'

export const TaskCard = ({task, getTasks}) => {

    const {deleteTask, currentProject} = useContext(UserContext)



    const handleDelete = () => {
        deleteTask(currentProject._id, task)
        getTasks(currentProject._id)
    }


    return (
        <div>
            <Card border='info'>
                <Card.Title>{task.taskTitle} </Card.Title>
                <Card.Body>
                    <Card.Text>
                    {task.taskDescription} 
                    </Card.Text>
                </Card.Body>
                <button onClick = {() => handleDelete()}> Delete </button>
            </Card>
        </div>
    )
}
