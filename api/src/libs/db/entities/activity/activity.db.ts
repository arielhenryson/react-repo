import { Model } from 'mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Workflow, WorkflowDocument } from '../workflow/workflow.schema'
import { ActivityQueueProducers } from '../../../queue/producer/activity-queue.producers'

import { Activity, ActivityDocument } from './activity.schema'

import { randomUUID } from 'crypto'

@Injectable()
export class ActivityDB {
    constructor(
        private activityQueueProducers: ActivityQueueProducers,
        @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
        @InjectModel(Workflow.name) private workflowModel: Model<WorkflowDocument>,
    ) {}

    /* istanbul ignore next */
    async count(uid: string): Promise<number> {
        const where = {
            uid,
        }

        return this.activityModel.countDocuments(where).exec()
    }

    async create(workflowId: string, uid: string, customId?: string, params?: any): Promise<Activity> {
        const workflow = await this.workflowModel.findOne({
            id: workflowId,
            uid, 
        })

        if (!workflow) {
            throw new NotFoundException(`Workflow with ID ${workflowId} not found`)
        }

        for (let i = 0; i < workflow.tasks.length; i++) {
            workflow.tasks[i].status = 'pending'
        }

        const id = customId || randomUUID()
        const createdWorkflow = new this.activityModel({
            id,
            uid,
            workflow,
            engineTime: 0,
            time: Date.now(),
            status: 'pending',
            tasks: workflow.tasks,
        })

        if (params) {
            createdWorkflow.params = params
        }

        const res = await createdWorkflow.save()

        console.log('should set id', res.id)

        this.activityQueueProducers.add({
            uid: uid,
            activityId: res.id,
        })

        return res
    }

    async findById(id: string, uid: string): Promise<Activity> {
        const activity = await this.activityModel.findOne({
            id, uid, 
        })

        if (!activity) {
            throw new NotFoundException(`Activity with ID ${id} not found`)
        }

        return activity
    }

    /* istanbul ignore next */
    async findAll(uid: string, skip: number = 0, limit: number = 200): Promise<Activity[]> {
        const where = {
            uid,
        }

        return this.activityModel
            .find(where)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .exec()
    }

    /* istanbul ignore next */
    async update(id: string, uid: string, updateData: Partial<Activity>): Promise<Activity> {
        const activity = await this.activityModel.findOne({
            id, uid, 
        })

        if (!activity) {
            throw new NotFoundException(`Activity with ID ${id} not found`)
        }

        Object.assign(activity, updateData)

        return await activity.save()
    }

    /* istanbul ignore next */
    async denyOrApprove(id: string, uid: string, action: 'deny' | 'approve') {
        const activity = await this.findById(id, uid)

        for (const i in activity.tasks) {
            const updateTask = activity.tasks[i]

            if (updateTask.status !== 'pendingApproval') continue

            updateTask.output = {
                type: 'approval',
                data: action,
            }
            updateTask.status = 'completed'

            activity.tasks[i] = updateTask

            break
        }

        activity.status = action

        activity.lastUpdated = Date.now()

        if (action === 'approve'){
            activity.engineTime = 0
        }

        return await this.update(id, uid, activity)
    }

    /* istanbul ignore next */
    async sendActivityInput(id: string, uid: string, taskData) {
        const activity = await this.findById(id, uid)

        for (const i in activity.tasks) {
            const updateTask = { ...activity.tasks[i] }

            if (updateTask.id === taskData.id) {
                taskData.status = 'receivedInput'
                activity.tasks[i] = taskData

                break
            }
        }

        const data = {
            status: 'receivedInput',
            engineTime: 0,
            tasks: activity.tasks,
        }

        return await this.update(id, uid, data)
    }

    /* istanbul ignore next */
    async finishActivityChat(id: string, uid: string, taskId: string) {
        const activity = await this.findById(id, uid)

        for (const i in activity.tasks) {
            const updateTask = activity.tasks[i]
            if (updateTask.id === taskId) {
                updateTask.status = 'completed'
                activity.tasks[i] = updateTask

                break
            }
        }

        const data = {
            status: 'pending',
            lastUpdated: Date.now(),
            engineTime: 0,
            tasks: activity.tasks,
        }

        return await this.update(id, uid, data)
    }

    /* istanbul ignore next */
    async ignoreActivityTaskQuastion(id: string, uid: string) {
        return await this.sendPromptInteraction(
            id, 
            uid, 
            `I can't answer this question. try to complete the task without asking any question any more.`
        )
    }

    /* istanbul ignore next */
    async sendActivityChatInput(id: string, uid: string, msg) {
        const activity = await this.findById(id, uid)

        console.log(activity.tasks[0].output)

        for (const i in activity.tasks) {
            const updateTask = activity.tasks[i]

            if (updateTask.status !== 'pendingChatInput') continue

            updateTask.status = 'pending'

            if (updateTask.output.data === undefined) {
                updateTask.output.data = []
            }

            updateTask.output.data.push({
                role: 'user',
                data: msg,
            })
            
            activity.tasks[i] = updateTask

            break
        }

        const data = {
            status: 'pending',
            lastUpdated: Date.now(),
            engineTime: 0,
            tasks:  activity.tasks,
        }

        console.log('update data', JSON.stringify(data, null, 2))
        console.log('update id', id)

        return await this.update(id, uid, data)
    }

    /* istanbul ignore next */
    async sendPromptInteraction(id: string, uid: string, msg: string) {
        const activity = await this.findById(id, uid)

        for (const i in activity.tasks) {
            const updateTask = activity.tasks[i]

            if (updateTask.status !== 'waitForUserInput') continue

            updateTask.status = 'pending'
            if (updateTask.output.interaction === undefined) {
                updateTask.output.interaction = []
            }

            updateTask.output.interaction.push({
                role: 'human',
                data: msg,
            })
            
            activity.tasks[i] = updateTask

            break
        }

        const data = {
            status: 'pending',
            lastUpdated: Date.now(),
            engineTime: 0,
            tasks:  activity.tasks,
        }

        return await this.update(id, uid, data)
    }

    /* istanbul ignore next */
    async deleteById(id: string, uid: string): Promise<void> {
        const result = await this.activityModel.deleteOne({
            id, uid, 
        })

        if (result.deletedCount === 0) {
            throw new NotFoundException(`Activity with ID ${id} not found`)
        }
    }

    /* istanbul ignore next */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async internalFindOneAndUpdate(where: any, valuesToUpdate: any) {
        return await this.activityModel.findOneAndUpdate(
            where,
            { $set: valuesToUpdate },
            { new: true }
        ).exec()
    }

    /* istanbul ignore next */
    async internalFindById(id: string): Promise<Activity> {
        const activity = await this.activityModel.findOne({
            id, 
        })

        if (!activity) {
            throw new NotFoundException(`Activity with ID ${id} not found`)
        }

        return activity.toObject()
    }
}
