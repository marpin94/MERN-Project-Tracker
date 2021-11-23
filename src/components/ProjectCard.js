import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import UserContext from '../context/GlobalState';

import XCircle from "../images/XCircle";

 
//Project cards mapped from projects page. Brief description of project with link to tasks page

export const ProjectCard = ({title, id, deleteProject, project}) => {

    const {setCurrentProject, getProjects} = useContext(UserContext)


    const handleShow = () => {
        getProjects()

        setCurrentProject({
            ...project
        })

    }

    const handleClick = () => {
       deleteProject(id)
    }


    return (
        <>
            <p onClick={() => {handleShow()}} className ='card-link'>
                {title}    
            </p>
            <button className = 'delete-project-btn' onClick = {() => handleClick()}> <XCircle /> </button>
        </>
    )
}
