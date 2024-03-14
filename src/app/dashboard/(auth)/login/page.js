'use client'
import { signIn } from 'next-auth/react'
import styles from './page.module.css'

export default function Page() {
    return (
        <div className={styles.container}>
            <button onClick={() => signIn('google')}>Login with Google</button>
        </div>
    )
}