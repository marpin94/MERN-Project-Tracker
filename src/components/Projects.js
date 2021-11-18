import { useContext, useEffect, useState} from "react";
import { ProjectCard } from "./ProjectCard";
import UserContext from '../context/GlobalState';

import axios from 'axios'

import { motion } from "framer-motion";

import { AddProjectModal } from "./AddProjectModal";

//Main page with list of all projects. Currently pulling sample data will include add project functionality

const Projects =  () => {

    const [show, setShow] = useState(false)

    const {projects, getProjects, deleteProject, deleteTask} = useContext(UserContext)



    return (
        <div className='projects'>
            <h1 className='main-header'>Projects</h1>
            {show? '': <AddProjectModal show = {show} setShow = {setShow} getProjects = {getProjects} />}
            <ul>
                {projects.map(project => {
                    return(
                        <li key = {project._id}>
                        <ProjectCard 
                            title = {project.title}
                            tasks = {project.tasks}
                            id= {project._id}
                            deleteProject={deleteProject}
                            deleteTask ={deleteTask}
                            project = {project} 
                        />
                        </li>
                    )
                })}
           </ul>
        </div>
    )
}

export {Projects}


