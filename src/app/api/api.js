import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_DB_URL

function getToken() {
    return localStorage.getItem('authToken')
}

export async function fetchAllEvents() {
    try {
        const res = await axios.get(`${BASE_URL}/events/` , {headers : {Authorization : `Token ${getToken()}`}})
        return res.data
    } catch (err) {
        console.error(`Failed to fetch events from backend:`, err)
        throw err
    }
}

export async function fetchEventById(id) {
    try {
        const res = await axios.get(`${BASE_URL}/events/${id}/` , {headers : {Authorization : `Token ${getToken()}`}})
        return res.data
    } catch (err) {
        console.error(`Failed to fetch event with id ${id} from backend:`, err)
        throw err
    }
}

export async function createEvent(eventData) {
    try {
        const res = await axios.post(`${BASE_URL}/events/`, eventData , {headers : {Authorization : `Token ${getToken()}`}})
        return res.data
    } catch (err) {
        console.error(`Failed to create event:`, err)
        throw err
    }
}

export async function updateEvent(id, eventData) {
    try {
        const res = await axios.put(`${BASE_URL}/events/${id}/`, eventData , {headers : {Authorization : `Token ${getToken()}`}})
        return res.data
    } catch (err) {
        console.error(`Failed to update event with id ${id}:`, err)
        throw err
    }
}

export async function deleteEvent(id) {
    try {
        const res = await axios.delete(`${BASE_URL}/events/${id}/` , {headers : {Authorization : `Token ${getToken()}`}})
        return res.data
    } catch (err) {
        console.error(`Failed to delete event with id ${id}:`, err)
        throw err
    }
}

export async function searchEvents(title) {
    try {
        const res = await axios.get(`${BASE_URL}/events/`, {params: { title } , headers : {Authorization : `Token ${getToken()}`}} )
        return res.data
    }
    catch (err) {
        console.error(`Failed to search events with title ${title}:`, err)
        throw err
    }
}

export function logout() {
    localStorage.removeItem('authToken')
}

export async function login(username , password){
    try {
        const res = await axios.post(`${BASE_URL}/auth/login/` , {username , password})
        localStorage.setItem('authToken' , res.data.token)
        return [res.data.username , res.data.id]
    }
    catch (err) {
        console.error("Failed to login." , err)
        throw err
    }
}

export async function register(username , password) {
    try {
        const res = await axios.post(`${BASE_URL}/auth/register/` , {username , password})
        return username
    }
    catch (err) {
        console.error("Failed to register" , err)
        throw err
    }
}