import React, { useState, useEffect, useRef } from "react"

export default function Home() {
  const [startTime, setStartTime] = useState({ ms: 0, s: 0, m: 0, h: 0 })
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 })
  const [action, setAction] = useState("stop")
  const [intId, setIntId] = useState()
  let updatedH = time.h,
    updatedM = time.m,
    updatedS = time.s,
    updatedMs = time.ms

  const handleSetButton = () => {
    const date = new Date()
    // setTime({
    //   m: date.getMinutes(),
    //   h: date.getHours(),
    //   ms: date.getMilliseconds(),
    //   s: date.getSeconds(),
    // })
    setStartTime({
      m: date.getMinutes(),
      h: date.getHours(),
      ms: date.getMilliseconds(),
      s: date.getSeconds(),
    })
  }

  const handleRunButton = () => {
    if (action === "stop") {
      setIntId(setInterval(run, 10))
      setAction("run")
    } else if (action === "run") {
      clearInterval(intId)
      setAction("stop")
    }
  }

  const run = () => {
    if (updatedM >= 60) {
      updatedH++
      updatedM = 0
    } else if (updatedS >= 60) {
      updatedM++
      updatedS = 0
    } else if (updatedMs >= 100) {
      updatedS++
      updatedMs = 0
    }
    updatedMs++
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH })
  }

  const handleDate = () => {}

  return (
    <div>
      <h1>Initial time</h1>
      <p>hour: {startTime.h}</p>
      <p>minute: {startTime.m}</p>
      <p>second: {startTime.s}</p>
      <p>millisecond: {startTime.ms}</p>
      <button onClick={handleSetButton}>set time</button>
      <h1>Timer</h1>
      <p>hour: {time.h}</p>
      <p>minute: {time.m}</p>
      <p>second: {time.s}</p>
      <p>millisecond: {time.ms}</p>
      <button onClick={handleRunButton}>state</button>
    </div>
  )
}
