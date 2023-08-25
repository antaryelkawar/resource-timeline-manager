export interface TimelineGroup {
    id: string,
    title: string
}

export interface TimelineItem {
    id: string,
    title: string,
    group: string,
    startTime: number,
    endTime: number,
    assignee?: string,
    progress?: number
}