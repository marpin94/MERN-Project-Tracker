import React from 'react'
import {useState} from "react";

import axios from 'axios'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'



export const AddProjectModal = ({getProjects, setProjects}) => {

    // Get Projects, passed down from Projecs.js will make call to mongo when Modal is closed -> can this be passed direct from context?
    
    const [show, setShow] = useState(false)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleShow = () => {
        setShow(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newProject = {
            title: title,
            description: description,
        }

        axios.post('/Projects/add', newProject)
            .then(res => console.log(res.data))

        setShow(false)

        setTitle('')
        setDescription('')

        getProjects();

    }

    const handleClose = () => {
        setShow(false)
    }
    return (
        <div>
            <Button  onClick={() => handleShow()} className = 'add-btn'> New Project </Button>            
            <Modal show={show} onHide = {handleClose}>
                <Modal.Header>
                    <Modal.Title>New Project</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <form className = 'project-form'>
                            <label for = 'project-title'> Project Title </label>
                            <input type='text'
                                name='project-title'
                                value = {title} 
                                autoComplete = 'off'
                                onChange = {(e) => setTitle(e.target.value) }  
                            />
                            <label for ='project-description'> Project Description </label>      
                            <input type='text'
                                name='project-description'
                                value = {description}
                                autoComplete = 'off'
                                onChange = {(e) => setDescription(e.target.value)}
                            />
                            <br /> 
                            <Button variant = 'primary' onClick={handleSubmit}>
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
