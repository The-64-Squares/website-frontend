"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className={`
      fixed w-full z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700'
      }
    `}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">♔</div>
            <div>
              <h1 className="text-xl font-bold">College Chess Club</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Strategic Minds Unite</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="hover:text-yellow-600 transition-colors">About Us</Link>
            <Link href="#events" className="hover:text-yellow-600 transition-colors">Events</Link>
            <Link href="/members" className="hover:text-yellow-600 transition-colors">Members</Link>
            <Link href="/gallery" className="hover:text-yellow-600 transition-colors">Gallery</Link>
            <Link href="/resources" className="hover:text-yellow-600 transition-colors">Resources</Link>
            <Link href="/contact" className="hover:text-yellow-600 transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link href="/join" className="hidden md:inline-flex">
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">Join Us</Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex flex-col space-y-3">
              <Link href="#about" className="hover:text-yellow-600 transition-colors">About Us</Link>
              <Link href="#events" className="hover:text-yellow-600 transition-colors">Events</Link>
              <Link href="/members" className="hover:text-yellow-600 transition-colors">Members</Link>
              <Link href="/gallery" className="hover:text-yellow-600 transition-colors">Gallery</Link>
              <Link href="/resources" className="hover:text-yellow-600 transition-colors">Resources</Link>
              <Link href="/contact" className="hover:text-yellow-600 transition-colors">Contact</Link>
              <Link href="/join" className="w-full">
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white w-full">Join Us</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}