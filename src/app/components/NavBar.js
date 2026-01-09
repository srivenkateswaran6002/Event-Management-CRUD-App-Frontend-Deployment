"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { logout } from "../api/api"

export function NavBar() {

    const [searchTerm , setSearchTerm] = useState("")
    const router = useRouter()
    const [loggedIn , setLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        setLoggedIn(!!token)
    } , [])
    

    const handleSearch = async (e) => {
        e.preventDefault()
        console.log("Searching for:", searchTerm)
        router.push(`/?title=${encodeURIComponent(searchTerm)}`)
        setSearchTerm("")
    }

    const handleLogout = async (e) => {
        e.preventDefault()
        logout()
        setLoggedIn(false)
        router.push("/auth/")
    }

    return (
        <div className="w-full flex items-center bg-zinc-600 px-6 py-4">

        <Link href="/" className="text-white font-bold text-xl">
        Event Management System
        </Link>

        <div className="flex flex-1 justify-center gap-2 mx-6">
        <input type="text" placeholder="Search By Title..." className="text-white font-bold text-xl rounded-full px-4 py-2 bg-zinc-800" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <button className="rounded bg-red-400 py-2 p-4" onClick={(e) => handleSearch(e)}>Search</button>
        </div>

        <div className="flex items-center gap-4">
        <Link href="/events/new" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-center rounded px-4 py-2">
        Create New Event
        </Link>

        {loggedIn && <button className="rounded bg-red-400 py-2 p-4" onClick={(e) => handleLogout(e)}>Logout</button>}
        </div>

        </div>
    )
}