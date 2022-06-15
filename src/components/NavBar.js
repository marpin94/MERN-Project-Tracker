import React from 'react'
import { Nav } from 'react-bootstrap'

import styles from '../styles/Navbar.module.css'

export const NavBar = () => {
    return (
    <>
        <Nav className ={styles.nav}>
            <Nav.Item> <h4>React-Keep</h4> </Nav.Item>
        </Nav>
    </>
    )
}
