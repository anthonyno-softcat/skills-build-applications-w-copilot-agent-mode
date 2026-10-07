import express from 'express';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());
app.get('/', (_request, response) => {
  response.json({ service: 'OctoFit Tracker API', status: 'ok' });
});
app.get('/api/health/', (_request, response) => {
  response.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});