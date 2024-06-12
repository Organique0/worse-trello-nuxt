import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const giveBackgroundImage = (imageUrl: string | null) => {
  return "background-image:url(" + imageUrl + ")";
};