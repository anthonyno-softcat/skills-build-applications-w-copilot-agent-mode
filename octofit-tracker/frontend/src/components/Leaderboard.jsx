import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('/api/leaderboard/')
      .then((data) => {
        if (!ignore) {
          setLeaders(data)
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
        <p className="eyebrow">Competition</p>
        <h2>Leaderboard</h2>
      </div>
      {status === 'loading' && <p className="text-muted">Loading leaderboard...</p>}
      {status === 'error' && <p className="text-danger">Unable to load leaderboard.</p>}
      {status === 'ready' && (
        <div className="leader-list">
          {leaders.map((leader) => (
            <article className="leader-row" key={leader._id ?? leader.rank}>
              <span className="rank">#{leader.rank}</span>
              <div>
                <h3>{leader.userName}</h3>
                <p>{leader.team}</p>
              </div>
              <strong>{leader.points} pts</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard