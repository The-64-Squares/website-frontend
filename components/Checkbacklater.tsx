"use client"

import React from "react"
import { motion } from "framer-motion"
import { Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const CheckBackLater = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 relative"
      >
        {/* Clock with rotating hands */}
        <Clock className="h-16 w-16 text-yellow-500" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear"
          }}
          className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
        >
          <div className="h-6 w-0.5 bg-yellow-600 origin-bottom transform -translate-y-1/2" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear"
          }}
          className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
        >
          <div className="h-8 w-0.5 bg-yellow-700 origin-bottom transform -translate-y-1/2" />
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl font-bold mb-2"
      >
        Nothing Here Yet
      </motion.h3>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-gray-600 dark:text-gray-400 mb-6 max-w-md"
      >
        We're still working on this section. Check back later for exciting updates!
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Link href="/">
                <Button variant="outline" size="lg">
                  ← Back to Home
                </Button>
              </Link>
      </motion.div>

      {/* Floating chess pieces in background */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{
            y: Math.random() * 100 - 50,
            x: Math.random() * 200 - 100,
            opacity: 0.1,
            rotate: Math.random() * 360
          }}
          animate={{
            y: [null, Math.random() * 50 - 25],
            rotate: [null, Math.random() * 360]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute pointer-events-none text-4xl opacity-20"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`
          }}
        >
          {["♔", "♕", "♖", "♗", "♘"][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </div>
  )
}

export default CheckBackLater