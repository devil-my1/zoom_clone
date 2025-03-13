import CallList from "@/components/CallList"
import React from "react"

const RecordingsPage = () => {
	return (
		<section className='text-white size-full flex flex-col gap-10'>
			<h1 className='text-3xl font-bold'>Recordings</h1>
			<CallList type={"recordings"} />
		</section>
	)
}

export default RecordingsPage
