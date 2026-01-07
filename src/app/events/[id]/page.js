import { fetchEventById } from "@/app/api/api";
import Link from "next/link";

export default async function EventPage({ params }) {
  const { id } = await params;

  const event = await fetchEventById(id);

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
    <div className="bg-zinc-700 p-4 min-h-screen">

      <h2 className="text-5xl font-semibold text-white text-center">{event.title}</h2>

      <br />

      <div className="bg-zinc-900 bg-center text-center text-3xl rounded-2xl w-xl p-6 mx-auto">
        <p className="text-zinc-400 mt-2">{event.description}</p>
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

      <br />

      <div className="bg-zinc-900 bg-center text-center text-3xl rounded-2xl w-fit p-7 mx-auto">
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