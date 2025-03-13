/* eslint-disable no-unused-vars */

declare interface CardBoxProps {
	title: string
	description: string
	icon: string
	onClick: () => void
	className?: string
}

declare interface MeetingModalProps {
	isOpen: boolean
	title: string
	buttonText: string
	image?: string
	buttonIcon?: string
	className?: string
	children?: React.ReactNode
	handleClick?: () => void
	onClose: () => void
}

declare interface MeetingSetupProps {
	setIsSetupCompelete: (value: boolean) => void
}

interface MeetingCardProps {
	title: string
	date: string
	icon: string
	isPreviousMeeting?: boolean
	buttonIcon1?: string
	buttonText?: string
	handleClick: () => void
	link: string
}
