"use client"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const Sidebar = () => {
	const pathname = usePathname()
	return (
		<section className='sidebar'>
			<div className='flex flex-1 flex-col gap-6'>
				{sidebarLinks.map(({ label, imgURL, route }) => (
					<Link
						key={label}
						href={route}
						className={cn(
							"flex gap-4 items-center p-4 rounded-lg justify-start",
							{
								"bg-blue-1":
									pathname === route || pathname.startsWith(`${route}/`)
							}
						)}
					>
						<Image
							src={imgURL}
							alt='menu icon'
							width={24}
							height={24}
						/>
						<p className='text-lg font-semibold max-lg:hidden'>{label}</p>
					</Link>
				))}
			</div>
		</section>
	)
}

export default Sidebar
