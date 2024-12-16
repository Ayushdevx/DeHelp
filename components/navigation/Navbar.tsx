"use client";

import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-20 items-center justify-between px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="DeHelp Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="brand-text gradient-text text-lg tracking-widest">
              DeHelp
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <div className="hidden md:flex items-center space-x-3">
            <Button
              asChild
              variant="ghost"
              className="h-10 px-4 tracking-widest brand-text"
            >
              <Link href="/auth/login">Login In</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-10 px-4 tracking-widest brand-text"
            >
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
          <MobileNav />
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.header>
  );
}