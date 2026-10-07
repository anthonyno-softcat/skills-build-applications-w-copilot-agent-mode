import express from 'express';

import { connectDatabase } from './config/database';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.get('/', (_request, response) => {
  response.json({ service: 'OctoFit Tracker API', status: 'ok', baseUrl });
});
app.get('/api/health/', (_request, response) => {
  response.json({ status: 'ok' });
});
app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ name: 1 }).lean());
});
app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().sort({ name: 1 }).lean());
});
app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().sort({ activityDate: -1 }).lean());
});
app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().sort({ rank: 1 }).lean());
});
app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ name: 1 }).lean());
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });

export { app, baseUrl };
