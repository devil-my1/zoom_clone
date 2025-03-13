"use client"
import { useGetCalls } from "@/hooks/useGetCalls"
import { Call, CallRecording } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { getNoCallsMessage } from "@/lib/utils"
import MeetingCard from "./MeetingCard"
import Loader from "./Loader"
import { toast } from "sonner"

const CallList = ({ type }: { type: "upcoming" | "ended" | "recordings" }) => {
	const { isLoading, endedCalls, upcomingCalls, callRecordings } = useGetCalls()
	const [recordings, setRecordings] = useState<CallRecording[]>([])
	const router = useRouter()

	const getCalls = () => {
		switch (type) {
			case "upcoming":
				console.log(upcomingCalls)
				return upcomingCalls
			case "ended":
				return endedCalls
			case "recordings":
				return recordings
			default:
				return []
		}
	}

	useEffect(() => {
		const fetchRecordings = async () => {
			try {
				const callData = await Promise.all(
					callRecordings.map(meeting => meeting.queryRecordings())
				)

				const recordings = callData
					.filter(call => call.recordings.length > 0)
					.flatMap(call => call.recordings)

				setRecordings(recordings)
			} catch (error) {
				console.error(error)
				toast("Failed to fetch recordings")
			}
		}

		if (type === "recordings") fetchRecordings()
	}, [callRecordings, type])

	const callsList = getCalls()
	const noCallsMessage = getNoCallsMessage(type)

	return isLoading ? (
		<Loader />
	) : (
		<div className='grid grid-cols-1 gap-5 xl:grid-cols-3'>
			{callsList && callsList.length > 0 ? (
				callsList.map((meeting: Call | CallRecording) => (
					<MeetingCard
						key={(meeting as Call)?.id}
						icon={
							type === "ended"
								? "/icons/previous.svg"
								: type === "upcoming"
									? "/icons/upcoming.svg"
									: "/icons/recordings.svg"
						}
						title={
							(meeting as Call).state?.custom?.description?.substring(0, 25) ||
							(meeting as CallRecording)?.filename?.substring(0, 20) ||
							"Personal Meeting"
						}
						date={
							(meeting as Call).state?.startsAt?.toLocaleDateString() ||
							new Date((meeting as CallRecording)?.start_time).toUTCString()
						}
						isPreviousMeeting={type === "ended"}
						buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
						buttonText={type === "recordings" ? "Play" : "Start"}
						link={
							type === "recordings"
								? (meeting as CallRecording)?.url
								: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call)?.id}`
						}
						handleClick={
							type === "recordings"
								? () => router.push((meeting as CallRecording)?.url)
								: () => router.push(`/meeting/${(meeting as Call)?.id}`)
						}
					/>
				))
			) : (
				<p>{noCallsMessage}</p>
			)}
		</div>
	)
}

export default CallList
