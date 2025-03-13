import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCallById = (callId: string | string[]) => {
	const [call, setCall] = useState<Call>()
	const [isLoading, setIsLoading] = useState(true)

	const client = useStreamVideoClient()

	useEffect(() => {
		if (!client) return

		const loadCall = async () => {
			const { calls } = await client.queryCalls({
				filter_conditions: { id: callId }
			})

			if (calls.length > 0) setCall(calls[0])

			setIsLoading(false)
		}

		loadCall()
	}, [client, callId])

	return { call, isLoading }
}
