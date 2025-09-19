"use client"

import { useState } from "react"
import styles from "@/app/layout.module.css"

export default function Header() {
    const [navOpen, setNavOpen] = useState(false);
    const toggleNav = () => setNavOpen(!navOpen);

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <a href="/" className={styles.logo}>
                    <span className={styles.letter}>m</span>
                    <span className={styles.letter}>u</span>
                    <span className={styles.letter}>e</span>
                    <span className={styles.space}></span>
                    <span className={styles.letter}>v</span>
                    <span className={styles.letter}>e</span>
                    <span className={styles.sub}>
                        (<span className={styles.letter}>g</span>
                        <span className={styles.letter}>a</span>
                        <span className={styles.space}></span>
                        <span className={styles.letter}>l</span>
                        <span className={styles.letter}>e</span>
                        <span className={styles.letter}>r</span>
                        <span className={styles.space}></span>
                        <span className={styles.letter}>í</span>
                        <span className={styles.letter}>a</span>
                        <span className={styles.space}></span>
                        )
                    </span>
                </a>
                <button
                    onClick={toggleNav}
                    className={`${styles.menuButton} ${navOpen ? styles.open : styles.closed}`}
                >
                    {navOpen ? "✕" : "☰"}
                </button>
            </div>

            <nav className={`${styles.nav} ${navOpen ? styles.open : ""}`}>

                <ul>
                    <li><a href="/artists">Artistas</a></li>
                    <li><a href="/fairs">Ferias</a></li>
                    <li><a href="/exhibitions">Exposiciones</a></li>
                    <li><a href="/publications">Publicaciones</a></li>
                    <li><a href="/about">Nosotros</a></li>
                </ul>
            </nav>
        </header>
    )
}
