import mongoose from 'mongoose';

import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      { username: 'mona', name: 'Mona Octocat', email: 'mona@example.com', team: 'OctoForce', age: 28 },
      { username: 'hubert', name: 'Hubert Runner', email: 'hubert@example.com', team: 'Branch Racers', age: 34 },
      { username: 'nina', name: 'Nina Sprint', email: 'nina@example.com', team: 'OctoForce', age: 31 },
    ]);

    await Team.insertMany([
      { name: 'OctoForce', mascot: 'Kettlebell', members: ['Mona Octocat', 'Nina Sprint'], weeklyGoalMinutes: 600 },
      { name: 'Branch Racers', mascot: 'Trail Shoe', members: ['Hubert Runner'], weeklyGoalMinutes: 420 },
    ]);

    await Activity.insertMany([
      { userName: 'Mona Octocat', activityType: 'Cycling', durationMinutes: 45, caloriesBurned: 410, activityDate: new Date('2026-10-01') },
      { userName: 'Hubert Runner', activityType: 'Trail Run', durationMinutes: 38, caloriesBurned: 460, activityDate: new Date('2026-10-02') },
      { userName: 'Nina Sprint', activityType: 'Strength Training', durationMinutes: 52, caloriesBurned: 390, activityDate: new Date('2026-10-03') },
    ]);

    await Leaderboard.insertMany([
      { rank: 1, userName: 'Hubert Runner', team: 'Branch Racers', points: 980 },
      { rank: 2, userName: 'Mona Octocat', team: 'OctoForce', points: 940 },
      { rank: 3, userName: 'Nina Sprint', team: 'OctoForce', points: 875 },
    ]);

    await Workout.insertMany([
      { name: 'Morning Momentum', focusArea: 'Cardio', difficulty: 'Beginner', durationMinutes: 25, exercises: ['Jump rope', 'Bodyweight squats', 'Fast walk intervals'] },
      { name: 'Core Builder', focusArea: 'Strength', difficulty: 'Intermediate', durationMinutes: 35, exercises: ['Plank holds', 'Dead bugs', 'Russian twists'] },
      { name: 'Trail Ready Legs', focusArea: 'Endurance', difficulty: 'Advanced', durationMinutes: 45, exercises: ['Walking lunges', 'Step-ups', 'Hill sprints'] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
