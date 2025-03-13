"use client"
import Loader from "@/components/Loader"
import MeetingRoom from "@/components/MeetingRoom"
import MeetingSetup from "@/components/MeetingSetup"
import { useGetCallById } from "@/hooks/useGetCallById"
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useParams } from "next/navigation"
import React, { useState } from "react"

const MeetingPage = () => {
	const { meetingId } = useParams<{ meetingId: string }>()
	const { user, isLoaded } = useUser()
	const [isSetupCompelete, setIsSetupCompelete] = useState(false)
	const { call, isLoading } = useGetCallById(meetingId)

	if (!isLoaded || isLoading) return <Loader />

	return (
		<main className='h-screen w-full'>
			<StreamCall call={call}>
				<StreamTheme>
					{!isSetupCompelete ? (
						<MeetingSetup setIsSetupCompelete={setIsSetupCompelete} />
					) : (
						<MeetingRoom />
					)}
				</StreamTheme>
			</StreamCall>
		</main>
	)
}

export default MeetingPage
