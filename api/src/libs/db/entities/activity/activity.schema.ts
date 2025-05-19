/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ActivityDocument = HydratedDocument<Activity>

@Schema()
export class Activity {
    @Prop({
        unique: true,
    })
        id: string

    @Prop()
        uid: string

    @Prop({
        index: true,
    })
        engineTime: number 

    @Prop()
        lastUpdated: number

    @Prop()
        status: string

    @Prop()
        time: number 

    @Prop({ type: Object })
        params: any

    @Prop({ type: [ Object ] })
        tasks: any[]

    @Prop({ type: Object })
        workflow: any
}

export const ActivitySchema = SchemaFactory.createForClass(Activity)

/* istanbul ignore next */
ActivitySchema.pre('save', function (next) {
    this.lastUpdated = Date.now()
    next()
})

/* istanbul ignore next */
ActivitySchema.pre([ 'updateOne', 'findOneAndUpdate', 'updateMany' ], function (next) {
    this.set({ 
        lastUpdated: Date.now(),
    })
    next()
})
