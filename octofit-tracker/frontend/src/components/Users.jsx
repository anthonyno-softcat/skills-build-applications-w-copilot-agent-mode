import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('/api/users/')
      .then((data) => {
        if (!ignore) {
          setUsers(data)
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
        <p className="eyebrow">Profiles</p>
        <h2>Users</h2>
      </div>
      {status === 'loading' && <p className="text-muted">Loading users...</p>}
      {status === 'error' && <p className="text-danger">Unable to load users.</p>}
      {status === 'ready' && (
        <div className="resource-grid">
          {users.map((user) => (
            <article className="resource-card" key={user._id ?? user.email}>
              <h3>{user.name}</h3>
              <p>@{user.username}</p>
              <span>{user.team}</span>
              <span>{user.email}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users