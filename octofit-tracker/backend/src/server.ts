import express from 'express';
import './config/database.js';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from './models.js';

const app = express();
const port = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

const resources = [
  ['/api/users', User],
  ['/api/teams', Team],
  ['/api/activities', Activity],
  ['/api/leaderboard', LeaderboardEntry],
  ['/api/workouts', Workout],
] as const;

for (const [path, model] of resources) {
  app.get(path, async (_request, response) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      console.error(`Error loading ${path}:`, error);
      response.status(500).json({ error: 'Unable to load resource' });
    }
  });

  app.post(path, async (request, response) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      console.error(`Error creating ${path}:`, error);
      response.status(400).json({ error: 'Unable to create resource' });
    }
  });
}

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});