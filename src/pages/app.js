import React, { useState, useEffect, useRef } from "react"

export default function Home() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 })
  const [action, setAction] = useState("stop")
  const [intId, setIntId] = useState()

  const handleButton = () => {
    const date = new Date()
    setTime({
      m: date.getMinutes(),
      h: date.getHours(),
      ms: date.getMilliseconds(),
      s: date.getSeconds(),
    })
  }

  const handleDate = () => {}

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
