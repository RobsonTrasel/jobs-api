import { Job } from "../models/job";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class JobRepository {
    static async create(jobData: Job): Promise<Job> {
        const job = await prisma.job.create({ data: jobData });
        return new Job(job);
    }

    static async find(id: number): Promise<Job | null> {
        const job = await prisma.job.findUnique({ where: { id } });
        if (!job) return null;
        return new Job(job);
    }

    static async findAll(): Promise<Job[]> {
        const jobs = await prisma.job.findMany();
        return jobs.map((j) => new Job(j));
    }
}