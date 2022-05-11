import { useContext, useEffect } from "react"
import { useSession, signIn, signOut } from 'next-auth/react'
import { FollioContext } from "../context/follioContext"
import { useRouter } from "next/dist/client/router"
import Button from "../components/ui/buttons/button"
import PageHead from "../pageHead"
import Logo from "../components/logo"
import Google from "../components/ui/buttons/auth/google"

const Auth = () => {
    const { authenticateUser, checkAuthStatus } = useContext(FollioContext)
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        onload()
    }, [session])

    const onload = async () => {
        console.warn("auth status 🚩", await checkAuthStatus())
    }

    // return <div>
    //     <Button label="Continue with Google" action={authenticateUser} />
    // </div>


    return <div className={styles.main}>
        <PageHead title="Follio - Account 🦄" />
        <div className={styles.mainInputBox}>
            <header className="fixed top-0 left-0 w-screen lg:px-56 px-5 m-auto flex items-center justify-between h-[60px]">
                <Logo />
                {session ? <div className="flex items-center">
                    <img src={session.user.image} className='w-10 h-10 rounded-full mr-3 bg-mid border border-mid' />
                    <p className="">{session.user.name}</p>
                </div> : <></>}
            </header>


            <div className="max-w-4xl m-auto p-10 rounded-xl">
                {!session ? <div>
                    <p className="text-2xl sm:text-5xl font-medium leading-tight mb-3">👋Welcome to Follio</p>
                    <p className="opacity-50">We just need you to sign up/in to account.</p>
                </div> : <p className="text-2xl sm:text-5xl font-medium leading-tight mb-5">🎉Welcome back {session.user.name}🎉 </p>}


                {session && (session.user && sessionStorage.getItem("data")) ?
                    <div>
                        <div className="flex justify-center items-center mt-10">
                            <Button full={false} label="Go home" action={authenticateUser} />
                        </div>
                    </div>
                    : <div>
                        <div className="my-10 mb-3">
                            <Google />
                        </div>
                    </div>}
            </div>


            {/* {session ? <p className="sm:mt-5 text-2xl sm:text-3xl leading-tight m-auto">Welcome Back {session.user.name}</p>
                : <p className="sm:mt-5 text-2xl sm:text-3xl leading-tight m-auto">Sign up/Log in</p>}

            {session && (session.user && sessionStorage.getItem("data")) ?
                <div>
                    <div className="flex justify-center items-center mt-10">
                        <Button full={false} label="Go home" action={authenticateUser} />
                    </div>
                </div>
                : <div>
                    <div className="my-10 mb-3">
                        <Button full={false} label="Continue with Google" action={authenticateUser} />
                    </div>
                </div>} */}
        </div>

    </div>
}

export default Auth

const styles = {
    title: `text-3xl sm:text-6xl mb-2 font-extrabold text-center`,
    mainInputBox: ` p-5 rounded-md text-center sm:w-6/12`,
    main: `w-screen h-screen flex flex-col items-center justify-center bg-white`,
}