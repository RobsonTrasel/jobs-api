import jobRepository from "@/infra/jobs/job.repository";
import { JobAttributes } from "@/infra/shared/database/models/job";
import sequelize from "@/infra/shared/database/config";

describe("[Repository] test Job repository", () => {
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
      id: 5,
      title: "Software Engineer",
      description: "Develop and maintain software applications",
      location: "Remote",
      company: "Acme Inc.",
      salary: 80000,
    };

    const createdJob = await jobRepository.createJob(jobData);
    expect(createdJob.id).toEqual(jobData.id);
    expect(createdJob.title).toEqual(jobData.title);
    expect(createdJob.description).toEqual(jobData.description);
    expect(createdJob.location).toEqual(jobData.location);
    expect(createdJob.company).toEqual(jobData.company);
    expect(createdJob.salary).toEqual(jobData.salary);
  });

  it("should get all jobs", async () => {
    const jobData: JobAttributes = {
      id: 6,
      title: "Software Engineer",
      description: "Develop and maintain software applications",
      location: "Remote",
      company: "Acme Inc.",
      salary: 80000,
    };
    const createdJob = await jobRepository.createJob(jobData);
    const allJobs = await jobRepository.getAllJobs();
    expect(allJobs.length).toEqual(1);
    expect(allJobs[0].id).toEqual(createdJob.id);
    expect(allJobs[0].title).toEqual(createdJob.title);
    expect(allJobs[0].description).toEqual(createdJob.description);
    expect(allJobs[0].location).toEqual(createdJob.location);
    expect(allJobs[0].company).toEqual(createdJob.company);
    expect(allJobs[0].salary).toEqual(createdJob.salary);
  });

  it("should get a job by id", async () => {
    const jobData: JobAttributes = {
      id: 7,
      title: "Software Engineer",
      description: "Develop and maintain software applications",
      location: "Remote",
      company: "Acme Inc.",
      salary: 80000,
    };
    const createdJob = await jobRepository.createJob(jobData);
    const foundJob = await jobRepository.getJobById(createdJob.id);
    expect(foundJob).not.toBeNull();
    expect(foundJob!.id).toEqual(createdJob.id);
    expect(foundJob!.title).toEqual(createdJob.title);
    expect(foundJob!.description).toEqual(createdJob.description);
    expect(foundJob!.location).toEqual(createdJob.location);
    expect(foundJob!.company).toEqual(createdJob.company);
    expect(foundJob!.salary).toEqual(createdJob.salary);
  });
});
