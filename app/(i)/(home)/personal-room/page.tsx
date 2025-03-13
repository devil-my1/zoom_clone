"use client"
import CopyButton from "@/components/CopyButton"
import { Button } from "@/components/ui/button"
import { useGetCallById } from "@/hooks/useGetCallById"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"
import React from "react"

const Row = ({
	title,
	description
}: {
	title: string
	description?: string
}) => {
	return (
		<div className='flex flex-col gap-2 items-start xl:flex-row xl:gap-4'>
			<h2 className='text-base text-sky-1 font-bold lg:text-xl xl:min-w-32'>
				{title}
			</h2>
			<p className='font-medium truncate text-sm max-w-[320px] lg:text-xl'>
				{description}
			</p>
		</div>
	)
}

const PersonalRoomPage = () => {
	const { user } = useUser()
	const meetingId = user?.id
	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}`
	const client = useStreamVideoClient()
	const router = useRouter()

	const { call } = useGetCallById(meetingId!)

	const startMeeting = async () => {
		if (!client || !user) return

		if (!call) {
			const newCall = client.call("default", meetingId!)
			await newCall.getOrCreate({
				data: {
					starts_at: new Date().toISOString()
				}
			})
		}

		router.push(`/meeting/${meetingId}?personal=true`)
	}

	return (
		<section className='text-white size-full flex flex-col gap-10'>
			<h1 className='text-3xl font-bold'>Personal Room</h1>

			<div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
				<Row
					title='Topic:'
					description={`${user?.username}'s meeting room`}
				/>
				<Row
					title='Meeting ID:'
					description={meetingId}
				/>
				<Row
					title='Invite Link:'
					description={meetingLink}
				/>
			</div>
			<div className='flex gap-5'>
				<Button
					className='bg-blue-1'
					onClick={startMeeting}
				>
					Start Meeting
				</Button>
				<CopyButton
					className='bg-dark-1'
					link={meetingLink}
				/>
			</div>
		</section>
	)
}

export default PersonalRoomPage
