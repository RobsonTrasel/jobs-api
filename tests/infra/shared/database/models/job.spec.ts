import Job, { JobAttributes } from "@/infra/shared/database/models/job";
import sequelize from "@/infra/shared/database/config";

describe("[Model] test the Job model", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });

  it("should create a new job", async () => {
    const jobData: JobAttributes = {
      id: 1,
      title: "Software Engineer",
      description: "Develop and maintain software applications",
      location: "Remote",
      company: "Acme Inc.",
      salary: 80000,
    };
    const job = await Job.create(jobData);
    expect(job).toBeDefined();
    expect(job.title).toBe(jobData.title);
    expect(job.description).toBe(jobData.description);
    expect(job.location).toBe(jobData.location);
    expect(job.company).toBe(jobData.company);
    expect(job.salary).toBe(jobData.salary);
  });

  it("should update an existing job", async () => {
    const jobData: JobAttributes = {
      id: 2,
      title: "Software Engineer",
      description: "Develop and maintain software applications",
      location: "Remote",
      company: "Acme Inc.",
      salary: 80000,
    };
    const job = await Job.create(jobData);
    const updatedJobData: JobAttributes = {
      id: 2,
      title: "Senior Software Engineer",
      description: "Lead the development of software applications",
      location: "San Francisco, CA",
      company: "Acme Inc.",
      salary: 120000,
    };
    const [affectedCount, [updatedJob]] = await Job.update(updatedJobData, {
      where: { id: job.id },
      returning: true,
    });
    expect(affectedCount).toBe(1);
    expect(updatedJob).toBeDefined();
    expect(updatedJob.id).toBe(job.id);
    expect(updatedJob.title).toBe(updatedJobData.title);
    expect(updatedJob.description).toBe(updatedJobData.description);
    expect(updatedJob.location).toBe(updatedJobData.location);
    expect(updatedJob.company).toBe(updatedJobData.company);
    expect(updatedJob.salary).toBe(updatedJobData.salary);
  });

  it("should delete an existing job", async () => {
    const jobData: JobAttributes = {
        id: 3,
        title: "Software Engineer",
        description: "Develop and maintain software applications",
        location: "Remote",
        company: "Acme Inc.",
        salary: 80000,
    };
    const job = await Job.create(jobData);
    const affectedCount = await Job.destroy({ where: { id: job.id } });
    expect(affectedCount).toBe(1);
    const deletedJob = await Job.findByPk(job.id);
    expect(deletedJob).toBeNull();
  });
});
