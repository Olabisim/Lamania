'use client'
import { signIn, useSession } from 'next-auth/react'
import styles from './page.module.css'
import { useRouter } from 'next/router'

export default function Page() {


    const session = useSession()

    const router = useRouter()

    if(session.status == 'loading') return <p>Loading...</p>

    if(session.status == 'authenticated') router.push('/dashbaord')
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        signIn("credetials", {email, password})

    }

    return (
        <div className={styles.container}>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="email" placeholder="email" className={styles.input} requierd />
                <input type="password" placeholder="passoword" className={styles.input} requierd />
                <button className={styles.button}>Login</button>
            </form>

            <button onClick={() => signIn('google')}>Login with Google</button>

        </div>
    )

}