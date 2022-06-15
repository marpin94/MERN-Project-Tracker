import { useContext, useState} from "react";
import { ProjectCard } from "./ProjectCard";
import {NoteForm} from "./NoteForm"


import UserContext from '../context/GlobalState';

import styles from '../styles/Projects.module.css'
import Masonry from "react-masonry-css";



//Main page with list of all projects. Currently pulling sample data will include add project functionality

const Projects =  () => {


    const {projects, getProjects, setProjects} = useContext(UserContext)

    const [showForm, setShowForm] = useState(false)

    const breakpointCols = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    }

    

    return (
        <div className={styles.projects}>
            <NoteForm showForm={showForm} setShowForm={setShowForm} projects={projects} setProjects={setProjects} getProjects={getProjects}/>
            <Masonry
                breakpointCols={breakpointCols}
                className={styles.myMasonryGrid}
                columnClassName={styles.myMasonryGridColumn}
            >  
                {projects.map(project => {
                    return(
                        <ProjectCard 
                            title = {project.title}
                            tasks = {project.tasks}
                            id= {project._id}
                            project = {project} 
                            key={project._id}
                        />       
                    )
                })}
            </Masonry>
          
           
        </div>
    )
}

export {Projects}


