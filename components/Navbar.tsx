import Image from "next/image"
import Link from "next/link"
import React from "react"
import MobileNav from "./MobileNav"
import { SignedIn, UserButton } from "@clerk/nextjs"

const Navbar = () => {
	return (
		<nav className='navbar'>
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
				<p className='text-[26px] font-extrabold text-white max-sm:hidden'>
					Loom
				</p>
			</Link>
			<div className='flex-between gap-5'>
				<SignedIn>
					<UserButton />
				</SignedIn>
				<MobileNav />
			</div>
		</nav>
	)
}

export default Navbar
