import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('/api/teams/')
      .then((data) => {
        if (!ignore) {
          setTeams(data)
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
        <p className="eyebrow">Team management</p>
        <h2>Teams</h2>
      </div>
      {status === 'loading' && <p className="text-muted">Loading teams...</p>}
      {status === 'error' && <p className="text-danger">Unable to load teams.</p>}
      {status === 'ready' && (
        <div className="resource-grid">
          {teams.map((team) => (
            <article className="resource-card" key={team._id ?? team.name}>
              <h3>{team.name}</h3>
              <p>{team.mascot}</p>
              <span>{team.members?.length ?? 0} members</span>
              <span>{team.weeklyGoalMinutes} weekly goal minutes</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams