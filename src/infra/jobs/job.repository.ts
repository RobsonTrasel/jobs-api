import Job, { JobAttributes} from '../shared/database/models/job'

class JobRepository {
  async getAllJobs(): Promise<Job[]> {
    return await Job.findAll();
  }

  async getJobById(id: number): Promise<Job | null> {
    return await Job.findByPk(id);
  }

  async createJob(job: JobAttributes): Promise<Job> {
    return await Job.create(job);
  }

  async updateJob(id: number, job: JobAttributes): Promise<[number, Job[]]> {
    const [affectedCount, affectedRows] = await Job.update(job, { where: { id }, returning: true });
    return [affectedCount, affectedRows as Job[]];
  }

  async deleteJob(id: number): Promise<number> {
    return await Job.destroy({ where: { id } });
  }
}

export default new JobRepository()