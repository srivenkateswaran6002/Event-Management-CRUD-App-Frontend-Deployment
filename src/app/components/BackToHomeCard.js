import Image from "next/image"
import Link from "next/link"

export default function HomeCard() {
    return (
        <Link href="/">

        <div className="min-h-[230px] bg-blue-400 flex content-center justify-center p-4 rounded shadow hover:bg-blue-500 hover:scale-105 duration-200">
            <Image src="Home.svg" alt="Add Event" width={165} height={165} />
        </div>

        </Link>
    )
}