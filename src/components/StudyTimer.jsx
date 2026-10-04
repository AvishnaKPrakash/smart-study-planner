import { useEffect, useState } from "react"

function StudyTimer() {

  const [seconds, setSeconds] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {

    if (!isRunning) {
      return
    }

    const timer = setInterval(() => {
      setSeconds((prev) => {

        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)

  }, [isRunning])

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  function resetTimer() {
    setIsRunning(false)
    setSeconds(25 * 60)
  }

  return (
    <div className="timer-card">

      <div className="timer-header">
        <h3>Study Timer ⏱️</h3>
        <span>25 min session</span>
      </div>

      <div className="timer-display">
        {String(minutes).padStart(2, "0")}:
        {String(remainingSeconds).padStart(2, "0")}
      </div>

      <div className="timer-buttons">

        <button
          onClick={() => setIsRunning(!isRunning)}
          className="timer-start"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={resetTimer}
          className="timer-reset"
        >
          Reset
        </button>

      </div>

    </div>
  )
}

export default StudyTimer