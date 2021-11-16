import React from 'react'
import {useState} from "react";

import axios from 'axios'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export const AddTaskModal = ({id, getTasks}) => {

    const [show, setShow] = useState(false)

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('');

    const handleShow = () => {
        setShow(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            priority: taskPriority,
            projectId: id
        }

        axios.post('/Projects/addTask/'+id, newTask)
            .then(res => console.log(res.data))

        setShow(false)
    }

    const handleClose = () => {
        setShow(false)
    }
    return (
        <div>
            <Button variant = 'primary' onClick={() => handleShow()}> Add Tasks </Button>
            <Modal show={show} onHide = {handleClose}>
                <Modal.Header>
                    <Modal.Title>New Task</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <form className = 'task-form'>
                            <label for = 'task-title'> Task Name </label>
                            <input type='text' 
                                name='task-title' 
                                value = {taskTitle}
                                onChange = {(e) => setTaskTitle(e.target.value)}  
                            />
                            <label for ='task-description'> Task Description </label>      
                            <input type='text'
                                name='task-description'
                                value = {taskDescription}
                                autoComplete = 'off'
                                onChange = {(e) => setTaskDescription(e.target.value)}
                            />
                            <label for ='task-priority'> Task Priority </label>      
                            <input type='text'
                                name='task-priority'
                                value={taskPriority}
                                onChange={(e) => setTaskPriority(e.target.value)}
                            />
                            <br />
                            <Button variant="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </form>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}
