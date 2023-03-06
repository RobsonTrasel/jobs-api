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

    it('should return null when Job is not found', async () =>{
        const foundJob = await JobRepository.find(89328923)
        expect(foundJob).toBeNull()
    })

    it('should be able to return all jobs', async () => {
        const jobData1: Job = {
            id: 1,
            title: 'Desenvolvedor',
            company: 'Empresa',
            location: 'São Paulo',
            salary: 5000,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const jobData2: Job = {
            id: 2,
            title: 'Analista de Sistemas',
            company: 'Empresa 2',
            location: 'Rio de Janeiro',
            salary: 6000,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await prisma.job.createMany({
            data: [jobData1, jobData2]
        })

        const jobs = await JobRepository.findAll();
        expect(jobs.length).toEqual(2);
        expect(jobs[0].id).toEqual(jobData1.id);
        expect(jobs[0].title).toEqual(jobData1.title);
        expect(jobs[0].company).toEqual(jobData1.company);
        expect(jobs[0].salary).toEqual(jobData1.salary);
        expect(jobs[1].id).toEqual(jobData2.id);
        expect(jobs[1].title).toEqual(jobData2.title);
        expect(jobs[1].company).toEqual(jobData2.company);
        expect(jobs[1].salary).toEqual(jobData2.salary);
    })
})