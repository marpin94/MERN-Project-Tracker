import React, { useContext, useState } from 'react'
import axios from 'axios'
import UserContext from '../context/GlobalState';

import XCircle from "../images/XCircle";

 
//Project cards mapped from projects page. Brief description of project with link to tasks page

export const ProjectCard = ({title, id, project}) => {

    const {setCurrentProject, getProjects} = useContext(UserContext)

    const deleteProject = (id) => {
        axios.delete('/Projects/'+id)
        .then(response => {console.log(response.data)})
    
        getProjects()
      }
    


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
        <div className='project-card'>
            <p onClick={() => {handleShow()}} className ='card-link'>
                {title}  
            </p>
            <button className = 'delete-project-btn' onClick = {() => handleClick()}> <XCircle /> </button>    
        </div>
    )
}
