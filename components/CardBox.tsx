import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"

const CardBox = ({
	title,
	icon,
	description,
	className,
	onClick
}: CardBoxProps) => {
	return (
		<div
			className={cn("card-box", className)}
			onClick={onClick}
		>
			<figure className='flex-center glassmorphism size-12 rounded-[10px]'>
				<Image
					src={icon}
					alt='card icon'
					width={27}
					height={27}
				/>
			</figure>
			<div className='flex flex-col gap-2'>
				<h2 className='text-2xl font-bold'>{title}</h2>
				<p className='text-lg font-normal'>{description}</p>
			</div>
		</div>
	)
}

export default CardBox
