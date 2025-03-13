import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getNoCallsMessage = (type: string) => {
	switch (type) {
		case "upcoming":
			return "No upcoming calls."
		case "ended":
			return "No Previous calls."
		case "recordings":
			return "No recordings."
		default:
			return ""
	}
}
