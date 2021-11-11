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
        <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.25 }}
        >
            <h1 className='main-header'>Project Tracker</h1>
            {show? '': <AddProjectModal show = {show} setShow = {setShow} getProjects = {getProjects} />}
            <div className ='projects'>
                {projects.map(project => {
                    return(
                        <li key = {project._id}>
                        <ProjectCard 
                            title = {project.title}
                            tasks = {project.tasks}
                            id= {project._id}
                            deleteProject={deleteProject}
                            deleteTask ={deleteTask} 
                        />
                        </li>
                    )
                })}
            </div>
        </motion.div>
    )
}

export {Projects}


