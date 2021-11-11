import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {
    Link
  } from "react-router-dom"
 
//Project cards mapped from projects page. Brief description of project with link to tasks page

export const ProjectCard = ({title, id, deleteProject}) => {

    const handleClick = () => {
       deleteProject(id)
    }

    return (
        <>
        <Card border="info" className='project-card'>
            <Card.Body>
                <Card.Title><Link to={`/${id}`} className='card-link'>{title}</Link></Card.Title>
                <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Card.Text>
                <Button onClick = {() => handleClick()}>Delete</Button>
            </Card.Body>
        </Card>
        </>
    )
}
