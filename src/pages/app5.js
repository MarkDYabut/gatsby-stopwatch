import React, { useState, useEffect, useRef } from "react"

export default function Home() {
  const [startTime, setStartTime] = useState({ ms: 0, s: 0, m: 0, h: 0 })
  const [currentTime, setCurrentTime] = useState({ ms: 0, s: 0, m: 0, h: 0 })
  const [elapsedTime, setElapsedTime] = useState({ ms: 0, s: 0, m: 0, h: 0 })
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 })
  const [action, setAction] = useState("stop")
  const [clockState, setClockState] = useState(0)
  const [intId, setIntId] = useState()
  let updatedH = time.h,
    updatedM = time.m,
    updatedS = time.s,
    updatedMs = time.ms

  const handleInitialButton = () => {
    const date = new Date()
    setStartTime({
      m: date.getMinutes(),
      h: date.getHours(),
      ms: date.getMilliseconds(),
      s: date.getSeconds(),
    })
    handleCurrentButton()
  }
  const handleCurrentButton = () => {
    if (clockState === 0) {
      setClockState(setInterval(clock, 10))
    } else {
      clearInterval(clockState)
      setClockState(0)
    }
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

  const clock = () => {
    const date = new Date()
    setCurrentTime({
      m: date.getMinutes(),
      h: date.getHours(),
      ms: date.getMilliseconds(),
      s: date.getSeconds(),
    })
    // setElapsedTime({
    //   m: date.getMinutes() - startTime.m,
    //   h: date.getHours() - startTime.h,
    //   ms: date.getMilliseconds() - startTime.ms,
    //   s: date.getSeconds() - startTime.s,
    // })
    setElapsedTime({
      m: date.getMinutes() - startTime.m,
      h: date.getHours() - startTime.h,
      ms: date.getMilliseconds() - startTime.ms,
      s:
        (date.getHours() * 60 * 60 +
          date.getMinutes() * 60 +
          date.getSeconds() -
          (startTime.h * 60 * 60 + startTime.m * 60 + startTime.s)) %
        60,
    })
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
      <button onClick={handleInitialButton}>set time</button>
      <h1>Current time</h1>
      <p>hour: {currentTime.h}</p>
      <p>minute: {currentTime.m}</p>
      <p>second: {currentTime.s}</p>
      <p>millisecond: {currentTime.ms}</p>
      <button onClick={handleCurrentButton}>state</button>
      <h1>Elapsed time</h1>
      <p>hour: {elapsedTime.h}</p>
      <p>minute: {elapsedTime.m}</p>
      <p>second: {elapsedTime.s}</p>
      <p>millisecond: {elapsedTime.ms}</p>
      <button onClick={handleCurrentButton}>state</button>
      <h1>Timer</h1>
      <p>hour: {time.h}</p>
      <p>minute: {time.m}</p>
      <p>second: {time.s}</p>
      <p>millisecond: {time.ms * 10}</p>
      <button onClick={handleRunButton}>state</button>
    </div>
  )
}
