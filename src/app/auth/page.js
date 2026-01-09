"use client"

import { useState } from "react"
import { login, register } from "../api/api"
import { useRouter } from "next/navigation"

export default function AuthPage(){

    const [logi , setLogin] = useState(true)
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (logi) {
            try {
                await login(username , password)
                router.push("/")
            }
            catch (err) {
                console.log("Failed to Login : " , err)
                alert("Falied to Login. Check Credentials!")
            }
        }
        else {
            try {
                await register(username , password)
                await login(username , password)
                router.push("/")
            }
            catch (err) {
                console.log("Failed to register user : " , err)
                alert("Failed to register user. Try Again!")
            }
        }
    }

    return (
        <div className="bg-zinc-900 text-center p-4 h-screen">
            <h2 className="text-white text-3xl">{logi && "Login"}{!logi && "Register"}</h2>

            <form className="bg-slate-800 rounded-2xl w-xl p-6 mx-auto mt-4 space-y-3" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" name="username" placeholder="Username" className="w-full p-2 rounded " required value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" name="password" placeholder="Password" className="w-full p-2 rounded " required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">{logi && "Login"}{!logi && "Register"}</button>
                {logi && <p className="mt-4 text-sm text-gray-600">New user?{" "}<span onClick={() => setLogin(false)} className="text-blue-600 cursor-pointer hover:underline">Click here to register</span></p>}
                {!logi && <p className="mt-4 text-sm text-gray-600">Already a user?{" "}<span onClick={() => setLogin(true)} className="text-blue-600 cursor-pointer hover:underline">Click here to login</span></p>}
            </form>

        </div>
    )
}