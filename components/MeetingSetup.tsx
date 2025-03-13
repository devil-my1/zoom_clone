"use client"
import {
	DeviceSettings,
	useCall,
	VideoPreview
} from "@stream-io/video-react-sdk"
import React, { useEffect, useState } from "react"

import { Button } from "./ui/button"

const MeetingSetup = ({ setIsSetupCompelete }: MeetingSetupProps) => {
	const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false)
	const call = useCall()

	if (!call)
		throw new Error("use  Call must be used within StreamCall component")

	useEffect(() => {
		if (isMicCamToggleOn) {
			call?.camera?.disable()
			call?.microphone?.disable()
		} else {
			call?.camera?.enable()
			call?.microphone?.enable()
		}
	}, [isMicCamToggleOn, call?.camera, call?.microphone])

	return (
		<div className='meeting-setup'>
			<h1 className='text-2xl font-bold'>Setup</h1>
			{/* <VideoPreview className='size-full' /> */}
			<div className='flex h-16 items-center justify-center gap-3 '>
				<label className='flex items-center justify-center gap-2 font-medium w-full'>
					<input
						type='checkbox'
						checked={isMicCamToggleOn}
						onChange={e => setIsMicCamToggleOn(e.target.checked)}
					/>
					Join with Mic and Camera off
				</label>
				<DeviceSettings />
			</div>
			<Button
				className='rounded-md bg-green-500 px-4 py-2.5'
				onClick={() => {
					call.join()
					setIsSetupCompelete(true)
				}}
			>
				Join Meeting
			</Button>
		</div>
	)
}

export default MeetingSetup
