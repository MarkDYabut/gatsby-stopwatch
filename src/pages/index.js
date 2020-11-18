import React, { useState, useEffect, useRef } from "react"

export default function Home() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 })
  const [action, setAction] = useState("stop")
  const [intId, setIntId] = useState()

  const handleButton = () => {
    if (action === "stop") {
      setIntId(setInterval(run, 10))
      setAction("run")
    } else if (action === "run") {
      clearInterval(intId)
      setAction("stop")
    }
  }

  // initialize variables (maybe can put these up top)
  // re factor these
  let updatedH = time.h,
    updatedM = time.m,
    updatedS = time.s,
    updatedMs = time.ms

  const run = () => {
    if (updatedM === 60) {
      updatedH++
      updatedM = 0
    } else if (updatedS === 60) {
      updatedM++
      updatedS = 0
    } else if (updatedMs === 100) {
      updatedS++
      updatedMs = 0
    }
    updatedMs++
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH })
  }

  return (
    <div>
      <p>hour: {time.h}</p>
      <p>minute: {time.m}</p>
      <p>second: {time.s}</p>
      <p>millisecond: {time.ms}</p>
      <button onClick={handleButton}>button</button>
    </div>
  )
}
