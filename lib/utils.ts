import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const giveBackgroundImage = (imageUrl: string | null) => {
  return "background-image:url(" + imageUrl + ")";
};

const workspaceTypeColors = {
  education: "bg-gradient-to-t from-orange-400 to-orange-600",
  it: "bg-gradient-to-t from-blue-400 to-blue-600",
  hr: "bg-gradient-to-t from-red-400 to-red-600",
  sales: "bg-gradient-to-t from-pink-400 to-pink-600",
  business: "bg-gradient-to-t from-purple-400 to-purple-600",
  marketing: "bg-gradient-to-t from-green-400 to-green-600",
  operations: "bg-gradient-to-t from-violet-400 to-violet-600",
  other: "bg-gradient-to-t from-pink-400 to-pink-600",
};

export function getWorkspaceTypeColor(type: string) {
  return workspaceTypeColors[type as keyof typeof workspaceTypeColors];
}