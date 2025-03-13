"use client"
import { useEffect, useState } from "react"
import MeetingTypeList from "@/components/MeetingTypeList"

export default function Home() {
	const locale = navigator.language || "en-US"
	const [now, setNow] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000)
		return () => clearInterval(interval)
	}, [])

	const dateString = now.toLocaleString(locale, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	})

	const timeString = now.toLocaleString(locale, {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h24"
	})

	return (
		<section className='home-container'>
			<div className='home-banner'>
				<div className='home-banner_container'>
					<h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
						Upcoming Meeting at: 12:30 PM
					</h2>
					<div className='flex flex-col gap-2'>
						<h3 className='text-4xl font-extrabold lg:text-7xl'>
							{timeString.replace(/:.*/, "")}
							<span className='animate-blinking'>:</span>
							{timeString.split(":")[1]}
						</h3>
						<p className='text-lg font-medium text-sky-1 lg:text-2xl'>
							{dateString}
						</p>
					</div>
				</div>
			</div>
			<MeetingTypeList />
		</section>
	)
}
