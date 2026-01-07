import { fetchAllEvents, searchEvents } from "./api/api"
import EventCard from "./components/EventCard"
import NewEvent from "./components/NewEventCard"
import BackToHomeCard from "./components/BackToHomeCard"

export default async function Home({searchParams}) {

  const {title} = await searchParams
  console.log(title)
  
  let events = []

  try {
    if (title) {
      events = await searchEvents(title)
    }
    else {
      events = await fetchAllEvents()
    }
  }
  catch (err) {
    console.error("Error fetching events in Home page:", err)
    events = []
  }

  // Sort the events only if list is not empty and by completed & upcoming order first
  if (events.length > 0) {
    events.sort((a, b) => {
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Events</h1>
      {
        (events.length === 0) ? (
          <p>No events available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {events.map((event) => <EventCard key={event.id} event={event} />)}
             {!title && <NewEvent />}
             {title && <BackToHomeCard />}
          </div>
        )
      }
    </div>
  )
}