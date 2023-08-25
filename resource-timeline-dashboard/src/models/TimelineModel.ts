import { TimelineItemBase } from "react-calendar-timeline"

export interface CustomTimelineGroup {
    id: string,
    title: string
}

export class CustomTimelineItem implements TimelineItemBase<number> {
    id: string
    title: string
    group: string
    startTime: number
    endTime: number
    assignee?: string
    progress?: number
    start_time: CustomTimelineItem['startTime']
    end_time: CustomTimelineItem['endTime']

    constructor(obj: any) {
        this.id = obj['id']
        this.title = obj['title']
        this.group = obj['group']
        this.startTime = obj['startTime']
        this.endTime = obj['endTime']
        this.start_time = obj['startTime']
        this.end_time = obj['endTime']
        this.assignee = obj['assignee']
        this.progress = obj['progress']
    }
}