import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { ReactNode } from "react"

export default function MainLayout({
	children
}: Readonly<{ children: ReactNode }>) {
	return (
		<main className='relative'>
			<Navbar />
			<div className='flex '>
				<Sidebar />
				<section className='main-layout-container'>
					<div className='w-full'>{children}</div>
				</section>
			</div>
		</main>
	)
}
