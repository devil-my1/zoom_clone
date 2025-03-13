"use client"
import React from "react"
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet"
import { LucideMenu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { sidebarLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const MobileNav = () => {
	const pathname = usePathname()
	return (
		<section className='w-full max-w-[264px]'>
			<Sheet>
				<SheetTrigger asChild>
					<LucideMenu
						size={36}
						className='text-white cursor-pointer sm:hidden'
					/>
				</SheetTrigger>
				<SheetContent
					side={"left"}
					className='border-none bg-dark-1'
				>
					<SheetTitle />
					<SheetClose asChild>
						<Link
							href='/'
							className='flex items-center gap-1'
						>
							<Image
								src='/icons/logo.svg'
								alt='logo'
								width={32}
								height={32}
								className='max-sm:size-10'
							/>
							<p className='text-[26px] font-extrabold text-white'>Loom</p>
						</Link>
					</SheetClose>

					<div className='flex flex-col justify-between overflow-y-auto h-[calc(100vh-72px)]'>
						<SheetClose asChild>
							<section className='flex h-full flex-col gap-6 pt-16 text-white'>
								<div className='flex flex-1 flex-col gap-6'>
									{sidebarLinks.map(({ label, imgURL, route }) => (
										<SheetClose
											key={label}
											asChild
										>
											<Link
												href={route}
												className={cn(
													"flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
													{
														"bg-blue-1":
															pathname === route ||
															pathname.startsWith(`${route}/`)
													}
												)}
											>
												<Image
													src={imgURL}
													alt='menu icon'
													width={20}
													height={20}
												/>
												<p className='font-semibold '>{label}</p>
											</Link>
										</SheetClose>
									))}
								</div>
							</section>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
		</section>
	)
}

export default MobileNav
