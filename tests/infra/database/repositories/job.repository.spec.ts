import { PrismaClient } from "@prisma/client";
import { JobRepository } from '@/infra/shared/database/repositories/job.repository'
import { Job } from "@/infra/shared/database/models/job";

const prisma = new PrismaClient()

describe('[Repository] test job repository methods', () => {
    beforeEach(async () => {
        await prisma.job.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should be able to create a job', async () => {
        const jobData: Job = {
            id: 1,
            title: 'Desenvolvedor',
            company: 'Empresa',
            location: 'São Paulo',
            salary: 5000,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const createdJob = await JobRepository.create(jobData);
        expect(createdJob).toHaveProperty('id');
        expect(createdJob.title).toEqual(jobData.title);
        expect(createdJob.company).toEqual(jobData.company);
        expect(createdJob.salary).toEqual(jobData.salary);
    })

    it('should find a job by id', async () => {
        const jobData: Job = {
            id: 1,
            title: 'Desenvolvedor',
            company: 'Empresa',
            location: 'São Paulo',
            salary: 5000,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    
        const createdJob = await prisma.job.create({ data: jobData });
    
        const foundJob = await JobRepository.find(createdJob.id);
        expect(foundJob).not.toBeNull();
        expect(foundJob!.id).toEqual(createdJob.id);
        expect(foundJob!.title).toEqual(createdJob.title);
        expect(foundJob!.company).toEqual(createdJob.company);
        expect(foundJob!.salary).toEqual(createdJob.salary);
    });
})