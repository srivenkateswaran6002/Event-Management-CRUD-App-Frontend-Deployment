"use client"

import { createEvent } from "@/app/api/api"
import Link from "next/link"

export default function NewEvent() {

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const newEvent = {
            title: formData.get("title"),
            description: formData.get("description"),
            venue: formData.get("venue"),
            date: formData.get("date"),
            time: formData.get("time"),
        }

        try {
            await createEvent(newEvent)
            e.target.reset() // clear form after success
        } catch (err) {
            console.error("Failed to create event:", err)
        }
    }

    return (
        <div className="bg-zinc-700 text-center p-4 h-screen">
            <h2 className="text-white text-3xl">Create New Event</h2>

            <form className="bg-zinc-900 rounded-2xl w-xl p-6 mx-auto mt-4 space-y-3" onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" className="w-full p-2 rounded" required/>
                <input type="text" name="description" placeholder="Description" className="w-full p-2 rounded" required/>
                <input type="text" name="venue" placeholder="Venue" className="w-full p-2 rounded"required />
                <input type="date" name="date" className="w-full p-2 rounded" required />
                <input type="time" name="time" className="w-full p-2 rounded" required />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">Create Event</button>
                <Link href={"/"}>
                <div className="bg-white text-black rounded p-3 content-center mx-auto w-fit mt-4 w-full"><p>Back To Home</p></div>
                </Link>
            </form>
        </div>
    )
}
