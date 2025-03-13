"use client"
import React, { useState } from "react"
import CardBox from "./CardBox"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { toast } from "sonner"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from "react-datepicker"
import { Input } from "./ui/input"

const MeetingTypeList = () => {
	const router = useRouter()
	const [meetingState, setMeetingState] = useState<
		"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
	>()
	const [val, setVal] = useState({
		dateTime: new Date(),
		description: "",
		link: ""
	})

	const [callDetails, setCallDetails] = useState<Call>()

	const { user } = useUser()
	const client = useStreamVideoClient()

	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

	const createMeeting = async () => {
		if (!user || !client) return

		try {
			if (!val.dateTime) {
				toast("Please select a date and time")
				return
			}
			const id = crypto.randomUUID()
			const call = client.call("default", id)

			if (!call) throw new Error("Failed to create a call")

			const startsAt =
				val.dateTime.toISOString() || new Date(Date.now()).toISOString()
			const desc = val.description || "Instant Meeting"

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description: desc
					}
				}
			})

			setCallDetails(call)

			if (!val.description || meetingState === "isInstantMeeting") {
				router.push(`/meeting/${call.id}?personal=true`)
			}
			toast("Meeting created successfully")
		} catch (error) {
			console.log(error)
			toast("failed to create a meeting")
		}
	}

	return (
		<section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
			<CardBox
				title='New Meeting'
				description='Start an instant meeting'
				icon='/icons/add-meeting.svg'
				onClick={() => {
					setMeetingState("isInstantMeeting")
				}}
				className='bg-orange-1'
			/>
			<CardBox
				title='Join Meeting'
				description='Via initiation link'
				icon='/icons/join-meeting.svg'
				onClick={() => {
					setMeetingState("isJoiningMeeting")
				}}
				className='bg-blue-1'
			/>
			<CardBox
				title='Schedule Meeting'
				description='Plan a meeting in advance'
				icon='/icons/schedule.svg'
				onClick={() => {
					setMeetingState("isScheduleMeeting")
				}}
				className='bg-purple-1'
			/>
			<CardBox
				title='View Recordings'
				description='Check out your past meetings'
				icon='/icons/recordings.svg'
				onClick={() => router.push("/recordings")}
				className='bg-yellow-1'
			/>
			{!callDetails ? (
				<MeetingModal
					isOpen={meetingState === "isScheduleMeeting"}
					onClose={() => setMeetingState(undefined)}
					title='Create Meeting'
					handleClick={createMeeting}
					buttonText='Schedule Meeting'
				>
					<label className='flex flex-col gap-2.5 text-base leading-[22px] text-sky-2'>
						Add a description
						<Textarea
							className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 max-h-[220px]'
							onChange={e => setVal({ ...val, description: e.target.value })}
						/>
					</label>

					<label className='flex w-full flex-col gap-2.5 text-base leading-[22px] text-sky-2'>
						Select date and time
						<ReactDatePicker
							selected={val.dateTime}
							onChange={date => setVal({ ...val, dateTime: date! })}
							showTimeSelect
							timeFormat='HH:mm'
							timeIntervals={15}
							timeCaption='Time'
							dateFormat='MMMM d, yyyy h:mm aa'
							className='w-full rounded p-2 focus:outline-none bg-dark-3 '
							popperClassName='react-datepicker-popper-custom'
							calendarClassName='react-datepicker-calendar-custom'
						/>
					</label>
				</MeetingModal>
			) : (
				<MeetingModal
					isOpen={meetingState === "isScheduleMeeting"}
					onClose={() => setMeetingState(undefined)}
					title='Meeting Created'
					className='text-center'
					image='/icons/checked.svg'
					buttonIcon='/icons/copy.svg'
					handleClick={() => {
						navigator.clipboard.writeText(meetingLink)
						toast("Link copied")
					}}
					buttonText='Copy Meeting Link'
				/>
			)}
			<MeetingModal
				isOpen={meetingState === "isJoiningMeeting"}
				onClose={() => setMeetingState(undefined)}
				title='Type the link here'
				className='text-center'
				buttonText='Join Meeting'
				handleClick={() => router.push(val.link)}
			>
				<Input
					placeholder='Meeting link'
					onChange={e => setVal({ ...val, link: e.target.value })}
					className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
				/>
			</MeetingModal>

			<MeetingModal
				isOpen={meetingState === "isInstantMeeting"}
				onClose={() => setMeetingState(undefined)}
				title='Start an Instant Meeting'
				className='text-center'
				handleClick={createMeeting}
				buttonText='Start Meeting'
			/>
		</section>
	)
}

export default MeetingTypeList
