import mongoose, { Schema } from 'mongoose';

const flexibleSchemaOptions = {
  timestamps: true,
  strict: false,
};

const userSchema = new Schema({}, flexibleSchemaOptions);
const teamSchema = new Schema({}, flexibleSchemaOptions);
const activitySchema = new Schema({}, flexibleSchemaOptions);
const leaderboardSchema = new Schema({}, flexibleSchemaOptions);
const workoutSchema = new Schema({}, flexibleSchemaOptions);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity =
  mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry ||
  mongoose.model('LeaderboardEntry', leaderboardSchema, 'leaderboard');
export const Workout =
  mongoose.models.Workout || mongoose.model('Workout', workoutSchema);