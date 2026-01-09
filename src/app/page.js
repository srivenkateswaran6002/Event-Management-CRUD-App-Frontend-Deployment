"use client"

import { fetchAllEvents, searchEvents } from "./api/api"
import EventCard from "./components/EventCard"
import NewEvent from "./components/NewEventCard"
import BackToHomeCard from "./components/BackToHomeCard"
import { useRouter, useSearchParams } from "next/navigation"
import {  useEffect, useState } from "react"
import Loading from "./components/Loading"

export default function Home() {

  const sParams = useSearchParams()
  const title = sParams.get("title")
  const router = useRouter()
  let sorted;
  
  const [events , setEvents] = useState([])
  const [load , setLoad] = useState(false)

  useEffect(() => {
    const getEvents = async () => {
       try {
        setLoad(true)
        if (title) {
          setEvents(await searchEvents(title))
        }
        else {
          setEvents(await fetchAllEvents())
        }
      }
      catch (err) {
        if (err?.response?.status === 401 ){
          router.push("/auth/")
          return null
        }
        console.error("Error fetching events in Home page:", err)
        setEvents([])
      }
      finally {
        setLoad(false)
      }
    }
    getEvents()
  } , [title])

  if (load) {
    return <Loading />
  }

  // Sort the events only if list is not empty and by completed & upcoming order first
  if (events.length > 0) {
    sorted = [...events].sort((a, b) => {
      const now = new Date()

      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      const isCompletedA = dateA < now
      const isCompletedB = dateB < now

      if (isCompletedA && !isCompletedB) return 1
      if (!isCompletedA && isCompletedB) return -1

      return dateA - dateB
    })
  }

  const handleDeleteSuccess = (deletedId) => {
  setEvents(prev => prev.filter(event => event.id !== deletedId))
  }

  return (
    <div className="p-4 bg-zinc-900 min-h-screen ">
      {(events.length !== 0) &&<h1 className="text-4xl font-bold mb-4 text-center">Events</h1>}
      {
        (events.length === 0) ? (
          <div className="p-4 min-h-screen flex items-center justify-center">
            <div className="bg-zinc-900 bg-center text-center text-3xl rounded-2xl w-xl p-6 mx-auto border-2">
              <p className="text-red-400 text-center text-5xl ">No Events Found. <br />Try Creating A Event!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {sorted.map((event) => <EventCard key={event.id} event={event} onDelete={handleDeleteSuccess} />)}
             {!title && <NewEvent />}
             {title && <BackToHomeCard />}
          </div>
        )
      }
    </div>
  )
}