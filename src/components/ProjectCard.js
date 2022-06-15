import React, { useContext, useState } from 'react'
import axios from 'axios'
import UserContext from '../context/GlobalState';

import XCircle from "../images/XCircle";

import styles from '../styles/ProjectCard.module.css'
 
//Project cards mapped from projects page. Brief description of project with link to tasks page

export const ProjectCard = ({title, id, project, key}) => {

    const {setCurrentProject, projects, setProjects} = useContext(UserContext)

    const deleteProject = (id) => {
        axios.delete('/Projects/'+id)
        .then(response => {console.log(response.data)})
        
        setProjects(projects.filter(project => id != project._id))
      }
    


    const handleShow = () => {
        

        setCurrentProject({
            ...project
        })

    }

    const handleClick = () => {
       deleteProject(id)
       setCurrentProject({})
    }


    return (
        <div className={styles.projectCard} onClick={() => {handleShow()}} key={key}>
            <h4>
                {title}  
            </h4>
            <p>
                {project.description}
            </p>
            <button className = 'delete-project-btn' onClick = {() => handleClick()}> <XCircle /> </button>    
        </div>
    )
}
