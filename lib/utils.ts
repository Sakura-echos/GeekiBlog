import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 Tailwind CSS 类名的工具函数
 * 用于解决类名冲突问题
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
