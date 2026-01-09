"use client"

import { fetchEventById, updateEvent } from "@/app/api/api"
import Loading from "@/app/components/Loading"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"

export default function EditEvent({params}) {

    const { id } = use(params)
    const router = useRouter()
    const [event , setEvent] = useState(null)
    const [load , setLoad] = useState(false)

    useEffect(() => {
        const getEvent = async () => {
            try {
                setLoad(true)
                setEvent(await fetchEventById(id))
            } catch (err) {
                console.error("Failed to fetch event:", err)
                setEvent(null)
            }
            finally{
                setLoad(false)
            }
        }
        getEvent()
    } , [])

    if(load) {
        return <Loading />
    }

    if(!event) {
        return (
        <div className="p-4 min-h-screen flex items-center justify-center ">
            <div className="bg-zinc-900 bg-center text-center text-3xl rounded-2xl w-xl p-6 mx-auto border-2">
                <p className="text-red-400 text-center text-5xl ">Event Not Found</p>
            </div> 
        </div>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const editEvent = {
            title: formData.get("title"),
            description: formData.get("description"),
            venue: formData.get("venue"),
            date: formData.get("date"),
            time: formData.get("time"),
        }

        try {
            await updateEvent(id , editEvent)
            router.push("/") // Redirect to home after success
        } catch (err) {
            console.error("Failed to create event:", err)
            alert("Failed to update event. Please try again.")
        }
    }

    return (
        <div className="bg-zinc-900 text-center p-4 h-screen">
            <h2 className="text-white text-3xl">Edit Event</h2>

            <form className="bg-slate-800 rounded-2xl w-xl p-6 mx-auto mt-4 space-y-3" onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" className="w-full p-2 rounded " required defaultValue={event.title}/>
                <input type="text" name="description" placeholder="Description" className="w-full p-2 rounded " required defaultValue={event.description}/>
                <input type="text" name="venue" placeholder="Venue" className="w-full p-2 rounded "required defaultValue={event.venue} />
                <input type="date" name="date" className="w-full p-2 rounded " required defaultValue={event.date} />
                <input type="time" name="time" className="w-full p-2 rounded " required defaultValue={event.time} />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">Save Event</button>
                <Link href={"/"}>
                <div className="bg-white text-black rounded p-3 content-center mx-auto mt-4 w-full"><p>Back To Home</p></div>
                </Link>
            </form>
        </div>
    )
}
