'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'


export default function Page() {

    const [err, setErr] = useState(false)

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const passoword = e.target[2].value;

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    passoword,
                }),
            });

            res.status === 201 && router.push('/dashboard/login?sucess=Account has been created')

        }
        catch (err) {
            setErr(true)
        }
    }


    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" placeholder="username" className={styles.input} requierd />
                <input type="email" placeholder="email" className={styles.input} requierd />
                <input type="password" placeholder="passoword" className={styles.input} requierd />
                <button className={styles.button}>Register</button>
            </form>
            {err && ""}
            <Link href="/dashboard/login">Login with an existing account</Link>
        </div>
    )
}