import { PrismaClient, Job as PrismaJob } from "@prisma/client";

const prisma = new PrismaClient()

export class Job implements PrismaJob {
    id!: number;
    title!: string;
    company!: string;
    location!: string;
    salary?: number | null;
    createdAt!: Date;
    updatedAt!: Date;
    description!: string;
    email!: string;
    new!: boolean;

    static async create(jobData: PrismaJob): Promise<Job> {
        const job = await prisma.job.create({
            data: jobData
        })
        return new Job(job)
    }

    static async find(id: number): Promise<Job | null> {
        const job = await prisma.job.findUnique({ where: { id } });
        if (!job) return null;
        return new Job(job);
    }

    constructor(data: PrismaJob) {
        Object.assign(this, data);
    }
    
}