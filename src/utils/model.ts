import { Schema, model, models } from 'mongoose';

const jobSchema = new Schema({
  company_name: String,
  job_title: String,
  salary: Number,
  location: String,
  description: String,
  reply: Boolean,
  interview: Boolean,
});

const Jobs = models.Job || model('Job', jobSchema);

export default Jobs;