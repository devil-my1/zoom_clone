import StreamVideoProvider from "@/providers/StreamClientProvider"
import { ReactNode } from "react"

export default function MainLayout({
	children
}: Readonly<{ children: ReactNode }>) {
	return (
		<main>
			<StreamVideoProvider>{children}</StreamVideoProvider>
		</main>
	)
}
