import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('/api/workouts/')
      .then((data) => {
        if (!ignore) {
          setWorkouts(data)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('error')
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h2>Workouts</h2>
      </div>
      {status === 'loading' && <p className="text-muted">Loading workouts...</p>}
      {status === 'error' && <p className="text-danger">Unable to load workouts.</p>}
      {status === 'ready' && (
        <div className="resource-grid">
          {workouts.map((workout) => (
            <article className="resource-card" key={workout._id ?? workout.name}>
              <h3>{workout.name}</h3>
              <p>{workout.focusArea}</p>
              <span>{workout.difficulty}</span>
              <span>{workout.durationMinutes} minutes</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts