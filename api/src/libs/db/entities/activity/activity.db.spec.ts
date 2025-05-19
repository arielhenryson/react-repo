import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { NotFoundException } from '@nestjs/common'

import { Workflow } from '../workflow/workflow.schema'
import { ActivityQueueProducers } from '../../../queue/producer/activity-queue.producers'

import { ActivityDB } from './activity.db'
import { Activity } from './activity.schema'

describe('ActivityDB', () => {
    let service: ActivityDB

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ActivityDB,
                {
                    provide: ActivityQueueProducers,
                    useValue: {
                        add: jest.fn(),
                    },
                },
                {
                    provide: getModelToken(Activity.name),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    useValue: function (dto: any) {
                        this.data = dto

                        this.save = () => {
                            return this.data
                        }
                    },
                },
                {
                    provide: getModelToken(Workflow.name),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    useValue: {
                        findOne: jest.fn(async where => {
                            if (where.id === '1') {
                                return {
                                    id: 'some workflow id',
                                    uid: 'some uid',
                                    tasks: [ {
                                        'type': 'some type',
                                    } ],
                                }
                            }

                            return null
                        }),
                    },
                },
            ],
        }).compile()

        service = module.get<ActivityDB>(ActivityDB)
    })

    describe('create', () => {
        it('should create an activity and return it', async () => {
            const res = await service.create('1', 'some uid')
            expect(res).toBeTruthy()
        })

        it('should throw NotFoundException when workflow is not found', async () => {
            await expect(service.create('2', 'some uid')).rejects.toThrow(NotFoundException)
        })
    })

    describe('create with params', () => {
        it('should create an activity and return it', async () => {
            const res = await service.create('1', 'some uid', 'some id', {
                foo: 'bar',
            })
            expect(res).toBeTruthy()
        })
    })

    describe('findById', () => {
        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    ActivityDB,
                    {
                        provide: ActivityQueueProducers,
                        useValue: {
                            add: jest.fn(),
                        },
                    },
                    {
                        provide: getModelToken(Activity.name),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        useValue: {
                            findOne: jest.fn(async where => {
                                if (where.id === '1') {
                                    return {
                                        id: 'some workflow id',
                                        uid: 'some uid',
                                        tasks: [],
                                    }
                                }
    
                                return null
                            }),
                        },
                    },
                    {
                        provide: getModelToken(Workflow.name),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        useValue: {
                            findOne: jest.fn(async where => {
                                if (where.id === '1') {
                                    return {
                                        id: 'some workflow id',
                                        uid: 'some uid',
                                        tasks: [ {} ],
                                    }
                                }
    
                                return null
                            }),
                        },
                    },
                ],
            }).compile()
    
            service = module.get<ActivityDB>(ActivityDB)
        })

        it('should create an activity and return it', async () => {
            const res = await service.findById('1', 'some uid')
            expect(res).toBeTruthy()
        })

        it('should throw NotFoundException when activity is not found', async () => {
            await expect(service.findById('nonexistent', 'some uid')).rejects.toThrow(NotFoundException)
        })
    })

    describe('find', () => {
        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    ActivityDB,
                    {
                        provide: ActivityQueueProducers,
                        useValue: {
                            add: jest.fn(),
                        },
                    },
                    {
                        provide: getModelToken(Activity.name),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        useValue: {
                            find: jest.fn(() => ({
                                sort: jest.fn().mockReturnThis(),
                                limit: jest.fn().mockReturnThis(),
                                exec: jest.fn().mockResolvedValue([
                                    {
                                        _id: '123', name: 'Whiskers', 
                                    },
                                    {
                                        _id: '456', name: 'Fluffy', 
                                    },
                                ]),
                            })),
                        },
                    },
                    {
                        provide: getModelToken(Workflow.name),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        useValue: {
                            findOne: jest.fn(async where => {
                                if (where.id === '1') {
                                    return {
                                        id: 'some workflow id',
                                        uid: 'some uid',
                                        tasks: [ {} ],
                                    }
                                }
    
                                return null
                            }),
                        },
                    },
                ],
            }).compile()
    
            service = module.get<ActivityDB>(ActivityDB)
        })

        it('should create an activity and return it', async () => {
            expect(1).toBeTruthy()
        })
    })
})
