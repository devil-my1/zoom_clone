import CallList from "@/components/CallList"
import React from "react"

const PreviousPage = () => {
	return (
		<section className='text-white size-full flex flex-col gap-10'>
			<h1 className='text-3xl font-bold'>Previous</h1>
			<CallList type={"ended"} />
		</section>
	)
}

export default PreviousPage
