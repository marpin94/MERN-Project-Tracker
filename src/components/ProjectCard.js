import React, { useContext, useState } from 'react'
import { TaskCard } from './TaskCard'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import UserContext from '../context/GlobalState';
import XCircle from '../images/XCircle';
 
//Project cards mapped from projects page. Brief description of project with link to tasks page

export const ProjectCard = ({title, id, deleteProject, project}) => {

    const {setCurrentProject, currentProject, getProjects} = useContext(UserContext)


    const handleShow = () => {
        getProjects()

        setCurrentProject({
            ...project
        })

        console.log(currentProject)
    }

    const handleClick = () => {
       deleteProject(id)
    }


    return (
        <>
            <Card.Body className='project-card'>
                <h6 onClick={() => {handleShow()}} className ='card-link'>
                    {title}    
                </h6>
                <button onClick = {() => handleClick()}> <XCircle /> </button>
            </Card.Body>
        </>
    )
}
