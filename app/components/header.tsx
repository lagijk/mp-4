// Navigation that shows the Champion Finder header for the website
"use client";
import Link from "next/link";

export default function Header() {
    return (
        <header>
            <h1>
                Champion Finder
            </h1>
            <nav>
                <Link href="/about">
                    Home
                </Link>
              
                <Link href="/rotation">
                    Weekly Rotation
                </Link>
            </nav>
        </header>
    );
}