import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "./ui/button"

const MeetingModal = ({
	isOpen,
	title,
	onClose,
	handleClick,
	className,
	children,
	buttonText,
	buttonIcon,
	image
}: MeetingModalProps) => {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent className={cn("meeting-modal", className)}>
				<DialogTitle />
				<div className='flex flex-col gap-6'>
					{image && (
						<div className='flex justify-center'>
							<Image
								src={image}
								alt='image'
								width={72}
								height={72}
							/>
						</div>
					)}
					<h1 className={cn("text-3xl font-bold leading-[42px]")}>{title}</h1>
					{children}
					<Button
						className='flex gap-2 bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0'
						onClick={handleClick}
					>
						{buttonIcon && (
							<Image
								src={buttonIcon}
								alt='btn-icon'
								width={13}
								height={13}
							/>
						)}
						{buttonText || "Schedule Meeting"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default MeetingModal
