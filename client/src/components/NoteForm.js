import axios from 'axios'
import React, { useState } from 'react'
import styles from '../styles/NoteForm.module.css'

export const NoteForm = ({showForm, setShowForm, projects, setProjects, getProjects}) => {

    const [title, setTitle] = useState('')
    const [noteBody, setNoteBody] = useState('')

    const openForm = () => setShowForm(true)


    const handleSubmit = (e) => {
        e.preventDefault()

        const newProject = {
            title: title,
            description: noteBody
        }

        axios.post('/Projects/add', newProject)
            .then(res => setProjects(projects => ([...projects,res.data])))

        setShowForm(false)

        setTitle('')
        setNoteBody('')

        // getProjects();
    
    }

    return (
        <form className={styles.noteForm}>
            <input className={showForm? styles.noteFormTitle: styles.hideTitle} id='title' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' />
            <textarea className={styles.noteFormText} id='noteBody' value={noteBody} onChange={(e)=>setNoteBody(e.target.value)} placeholder="Take some notes!" onFocus={openForm}/>
            <button onClick = {handleSubmit}> Submit </button>
        </form>
  )
}
