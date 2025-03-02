"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Progress } from "@/components/ui/progress"

export function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval)
          return 100
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    setProgress(0)
  }, [pathname])

  return <Progress value={progress} className="w-full h-1 fixed top-0 left-0 z-50 rounded-none" />
}

