import React from 'react'
import {useState, useContext, useEffect} from "react";

import axios from 'axios'

import UserContext from '../context/GlobalState';

import PlusCircle from "../images/PlusCircle";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export const AddTaskModal = ({currentProject, getTasks}) => {

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
            id: currentProject._id,
            complete: false
        }

        axios.post('/Projects/addTask/'+currentProject._id, newTask)
            .then(res => console.log(res.data))


        getTasks(currentProject._id)

        setTaskTitle('')
        setTaskDescription('')
        setTaskPriority('')

        setShow(false)
    }
    

    const handleClose = () => {
        setShow(false)
    }
    
    return (
        <div>
            {Object.keys(currentProject).length === 0 ?  'Select a Project to create tasks': <button onClick={() => handleShow()}> <PlusCircle/> </button>}
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
                                autoComplete = 'off'  
                            />
                            <label for ='task-description'> Task Description </label>      
                            <textarea
                                name='task-description'
                                value = {taskDescription}
                                autoComplete = 'off'
                                onChange = {(e) => setTaskDescription(e.target.value)}
                            />
                            <label for ='task-priority'> Task Priority </label>      
                            <select
                                name='task-priority'
                                value={taskPriority}
                                onChange={(e) => setTaskPriority(e.target.value)}
                            >
                                <option value = 'Low'> Low </option>
                                <option value = 'Medium'> Medium </option>
                                <option value = 'High'> High</option>
                            </select>
                            <br />
                            <Button variant="primary" onClick={(e) => handleSubmit(e)}>
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
