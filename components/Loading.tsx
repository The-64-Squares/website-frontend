"use client"

import React from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

const ChessLoading = () => {
  // Chess piece types for the animation
  const pieces = ["♔", "♕", "♖", "♗", "♘", "♙"]
  
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated chess pieces */}
        <div className="relative h-32 w-32 mx-auto mb-8">
          {pieces.map((piece, index) => (
            <motion.div
              key={index}
              className="absolute text-4xl"
              initial={{
                opacity: 0,
                y: -20,
                x: index % 2 === 0 ? -30 : 30
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -40, 0],
                x: 0,
                rotate: index % 2 === 0 ? [0, 180, 360] : [0, -180, -360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: pieces.length * 0.2,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              style={{
                left: "50%",
                top: "50%",
                marginLeft: "-0.5rem",
                marginTop: "-0.5rem"
              }}
            >
              {piece}
            </motion.div>
          ))}
        </div>

        {/* Loading text with spinner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-5 w-5 text-yellow-600" />
          </motion.div>
          <span className="text-lg font-medium">Loading your chess adventure...</span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="h-1 bg-yellow-500/30 mt-4 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 0.5,
              ease: "easeInOut"
            }}
            className="h-full bg-yellow-600"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default ChessLoading