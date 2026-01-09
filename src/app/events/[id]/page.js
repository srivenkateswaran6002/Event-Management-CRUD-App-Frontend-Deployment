"use client"

import { fetchEventById } from "@/app/api/api";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventPage() {
  const params = useParams();
  const id = params["id"]
  const [event , setEvent] = useState(null)
  const [load , setLoad] = useState(false)

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        setLoad(true)
        setEvent(await fetchEventById(id))
      }
      catch (err) {
        console.error("Error fetching event:", err);
        setEvent(null)
      }
      finally {
        setLoad(false)
      }
    }
    getEventDetails()
  } , [id])

  if (load) {
    return <Loading />
  }

  if (!event){
    return (
      <div className="p-4 min-h-screen flex items-center justify-center">
        <div className="bg-zinc-900 bg-center text-center text-3xl rounded-2xl w-xl p-6 mx-auto border-2">
          <p className="text-red-400 text-center text-5xl ">Event Not Found</p>
        </div>
      </div>
    )
  }

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

  return (
    <div className="bg-zinc-900 text-center p-4 h-screen">

      <h2 className="text-5xl font-semibold text-white text-center">{event.title}</h2>

      <div className="bg-slate-800 text-left rounded-2xl w-xl p-6 mx-auto mt-4 space-y-3 text-3xl">
        <p className="text-zinc-400 mt-2 text-center">{event.description}</p>
        <p className="mt-2">
          <strong>Venue:</strong> {event.venue}
        </p>
        <p>
          <strong>Date:</strong> {event.date}
          <br />
          <strong>Time:</strong> {event.time}
          <br />
          <strong>Status:</strong> <strong className={checkCompleted ? "text-green-500" : "text-yellow-500"}>{status}</strong>
        </p>
      </div>

      <br />

      <h2 className="text-5xl font-semibold text-white text-center">Additional Information</h2>

      <div className="bg-slate-800 text-left rounded-2xl w-fit p-6 mx-auto mt-4 space-y-3 text-3xl">
        <p className="mt-2">
          <strong>Created At:</strong> {event.created_at}
        </p>
        <p className="mt-2">
          <strong>Updated At:</strong> {event.updated_at}
        </p>
      </div>

      
      <Link href={"/"}>
      <div className="bg-white text-black rounded p-3 content-center mx-auto mt-4 w-fit"><p>Back To Home</p></div>
      </Link>
      
      
    </div>
  )
  
}