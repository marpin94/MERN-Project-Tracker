import { useContext, useState} from "react";
import { ProjectCard } from "./ProjectCard";
import { AddProjectModal } from "./AddProjectModal";

import UserContext from '../context/GlobalState';

import { ListGroup } from 'react-bootstrap'



//Main page with list of all projects. Currently pulling sample data will include add project functionality

const Projects =  () => {

    const [show, setShow] = useState(false)

    const {projects, getProjects, deleteProject, deleteTask} = useContext(UserContext)



    return (
        <div className='projects'>
            <h4 className='main-header'>Projects</h4>
            {show? '': <AddProjectModal show = {show} setShow = {setShow} getProjects = {getProjects} />}
            <ListGroup variant='flush'>
                {projects.map(project => {
                    return(
                        <ListGroup.Item key = {project._id}>
                        <ProjectCard 
                            title = {project.title}
                            tasks = {project.tasks}
                            id= {project._id}
                            deleteProject={deleteProject}
                            deleteTask ={deleteTask}
                            project = {project} 
                        />
                        </ListGroup.Item>
                    )
                })}
           </ListGroup>
        </div>
    )
}

export {Projects}


