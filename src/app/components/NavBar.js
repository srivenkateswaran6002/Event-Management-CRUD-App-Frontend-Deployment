"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function NavBar() {

    const [searchTerm , setSearchTerm] = useState("")
    const router = useRouter()

    const handleSearch = async (e) => {
        e.preventDefault()
        console.log("Searching for:", searchTerm)
        router.push(`/?title=${encodeURIComponent(searchTerm)}`)
        setSearchTerm("")
    }

    return (
        <div className="w-full flex items-center justify-between bg-zinc-900 px-6 py-4">
        <Link href="/" className="text-white font-bold text-xl">
        Event Management System
        </Link>
        <div className="flex gap-2">
        <input type="text" placeholder="Search By Title..." className="text-white font-bold text-xl rounded-full px-4 py-2 bg-zinc-600" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <button className="rounded bg-red-400 py-2 p-4" onClick={(e) => handleSearch(e)}>Search</button>
        </div>
        <Link href="/events/new" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-center rounded px-4 py-2">
        Create New Event
        </Link>
        </div>
    )
}