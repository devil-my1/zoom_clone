import Image from "next/image"
import React from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const CopyButton = ({
	link,
	className
}: {
	link: string
	className?: string
}) => {
	return (
		<Button
			onClick={() => {
				navigator.clipboard.writeText(link)
				toast("Link Copied")
			}}
			className={cn("lg:px-6", className)}
		>
			<Image
				src='/icons/copy.svg'
				alt='feature'
				width={20}
				height={20}
			/>
			&nbsp; Copy Link
		</Button>
	)
}

export default CopyButton
