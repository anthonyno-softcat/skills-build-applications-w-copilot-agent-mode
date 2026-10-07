import { useEffect, useState } from 'react'
import { fetchCollection as fetch } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetch('/api/activities/')
      .then((data) => {
        if (!ignore) {
          setActivities(data)
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
        <p className="eyebrow">Activity logging</p>
        <h2>Recent activities</h2>
      </div>
      {status === 'loading' && <p className="text-muted">Loading activities...</p>}
      {status === 'error' && <p className="text-danger">Unable to load activities.</p>}
      {status === 'ready' && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.userName}-${activity.activityDate}`}>
                  <td>{activity.userName}</td>
                  <td>{activity.activityType}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : 'Scheduled'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities