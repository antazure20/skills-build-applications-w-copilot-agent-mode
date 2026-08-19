import mongoose from 'mongoose';
import '../config/database.js';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from '../models.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  await mongoose.connection.asPromise();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.create([
    {
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      password: 'octofit-demo',
      avatar: 'https://i.pravatar.cc/150?img=12',
      goals: ['Build strength', 'Run a 10K'],
    },
    {
      name: 'Jordan Lee',
      email: 'jordan.lee@example.com',
      password: 'octofit-demo',
      avatar: 'https://i.pravatar.cc/150?img=32',
      goals: ['Improve endurance'],
    },
    {
      name: 'Taylor Kim',
      email: 'taylor.kim@example.com',
      password: 'octofit-demo',
      avatar: 'https://i.pravatar.cc/150?img=47',
      goals: ['Increase mobility'],
    },
  ]);

  const teams = await Team.create([
    {
      name: 'Summit Sprinters',
      description: 'A supportive team focused on consistent progress.',
      members: [users[0]._id, users[1]._id],
      totalPoints: 1860,
    },
    {
      name: 'Trail Blazers',
      description: 'Outdoor athletes chasing their next personal best.',
      members: [users[2]._id],
      totalPoints: 940,
    },
  ]);

  await Activity.create([
    {
      userId: users[0]._id,
      type: 'running',
      durationMinutes: 42,
      distanceKm: 6.4,
      calories: 510,
      points: 420,
      recordedAt: new Date('2026-08-17T07:30:00Z'),
    },
    {
      userId: users[1]._id,
      type: 'cycling',
      durationMinutes: 55,
      distanceKm: 18.2,
      calories: 620,
      points: 510,
      recordedAt: new Date('2026-08-18T17:15:00Z'),
    },
    {
      userId: users[2]._id,
      type: 'yoga',
      durationMinutes: 35,
      calories: 180,
      points: 210,
      recordedAt: new Date('2026-08-18T06:45:00Z'),
    },
  ]);

  await LeaderboardEntry.create([
    {
      userId: users[0]._id,
      teamId: teams[0]._id,
      points: 1020,
      rank: 1,
      period: 'weekly',
    },
    {
      userId: users[1]._id,
      teamId: teams[0]._id,
      points: 840,
      rank: 2,
      period: 'weekly',
    },
    {
      userId: users[2]._id,
      teamId: teams[1]._id,
      points: 940,
      rank: 3,
      period: 'weekly',
    },
  ]);

  await Workout.create([
    {
      name: 'Full-Body Strength',
      description: 'A balanced strength session for the whole body.',
      difficulty: 'intermediate',
      durationMinutes: 35,
      exercises: ['Goblet squats', 'Push-ups', 'Bent-over rows', 'Plank'],
      target: 'strength',
    },
    {
      name: '10K Tempo Builder',
      description: 'A progressive run to improve speed and endurance.',
      difficulty: 'intermediate',
      durationMinutes: 45,
      exercises: ['Warm-up jog', 'Tempo intervals', 'Recovery jog', 'Cool-down'],
      target: 'endurance',
    },
    {
      name: 'Morning Mobility Flow',
      description: 'Gentle movement to improve flexibility and recovery.',
      difficulty: 'beginner',
      durationMinutes: 20,
      exercises: ['Cat-cow', 'Worlds greatest stretch', 'Low lunge', 'Child pose'],
      target: 'mobility',
    },
  ]);

  console.log(
    'Created 3 users, 2 teams, 3 activities, 3 leaderboard entries, and 3 workouts.',
  );
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Unable to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
