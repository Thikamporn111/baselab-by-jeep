import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"BaseLab — เรียนรู้เลขฐาน",description:"เว็บแอปเรียนรู้ฐาน 2, 6, 8, 10 และ 16"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th"><body>{children}</body></html>}
