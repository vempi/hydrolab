import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDateTime(date: string): string {
  const parts = date.split("/"); // ["12", "02", "2025"]

  if (parts.length !== 3) {
    return "-";
  }

  const day = parts[0];
  const monthNum = parts[1];
  const year = parts[2];

  const months: Record<string, string> = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "11": "November",
    "12": "December",
  };

  const month = months[monthNum];

  if (!month) {
    return "Invalid month";
  }

  return `${day} ${month} ${year}`;
}

