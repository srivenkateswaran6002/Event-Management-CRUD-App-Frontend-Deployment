"use client"

import Link from "next/link"
import Image from "next/image"
import { deleteEvent } from "../api/api"
import { useRouter } from "next/navigation"

export default function EventCard({ event }) {

    const current_date = new Date()
    const event_date = new Date(event.date)
    let status = "Upcoming"

    if (event_date < current_date) {
        status = " Completed"
    } else if (event_date.toDateString() === current_date.toDateString()) {
        status = " Today"
    } else {
        status = " Upcoming in " + Math.ceil((event_date - current_date) / (1000 * 60 * 60 * 24)) + " day(s)"
    }

    const checkCompleted = status.includes("Completed")

    const router = useRouter()

    const handleDelete = async (eventId) => {
      if (confirm("Are you sure you want to delete this event?")) {
          try {
            await deleteEvent(eventId)
            router.refresh()
          }
          catch (err) {
            console.error("Error deleting event:", err)
            alert("Failed to delete event. Please try again after refresh.")
          }
      }
    }
    const handleEdit = async (eventId) => {
      router.push(`/events/edit/${eventId}`)
    }

  return (
    <div className="relative">
      {/* Buttons */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <button onClick={(e) => {e.stopPropagation(); console.log("Edit:", event.id); handleEdit(event.id)}} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded">
          <Image src="Edit.svg" alt="Edit" width={25} height={25} className="inline-block mr-1 content-center"/>
        </button>
        <button onClick={(e) => {e.stopPropagation(); console.log("Delete:", event.id); handleDelete(event.id)}} className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded">
          <Image src="Delete.svg" alt="Delete" width={25} height={25} className="inline-block mr-1 content-center"/>
        </button>
      </div>

      {/* Event Card */}
    <Link href={`/events/${event.id}`}>

    <div className="min-h-[230px] bg-zinc-700 p-4 rounded shadow hover:shadow-lg hover:bg-zinc-800 hover:scale-105 duration-200">
      <h2 className="text-xl font-semibold text-white">{event.title}</h2>
      <p className="text-zinc-400 mt-2">{event.description}</p>
      <p className="mt-2">
        <strong>Venue:</strong> {event.venue}
      </p>
      <p>
        <strong>Date:</strong> {event.date}
        <br />
        <strong>Time:</strong> {event.time}
        <br />
        <strong >Status : </strong><strong className={checkCompleted ? "text-green-500" : "text-yellow-500"}>{status}</strong>
      </p>
    </div>
    
    </Link>
    </div>
  );
}
