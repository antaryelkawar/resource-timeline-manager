import Timeline, { CursorMarker, TimelineKeys, TimelineMarkers, TodayMarker } from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import React from 'react'
import { CustomTimelineGroup, CustomTimelineItem } from '../models/TimelineModel';

const colorMap: Map<string, string> = new Map();

interface ResourceTimelineProps {
    groups: CustomTimelineGroup[];
    items: CustomTimelineItem[];
    setSelectedItem: (item: string) => void
}

const keys: TimelineKeys = {
    groupIdKey: 'id',
    groupTitleKey: 'title',
    groupRightTitleKey: 'rightTitle',
    itemIdKey: 'id',
    itemTitleKey: 'title',    // key for item div content
    itemDivTitleKey: 'title', // key for item div title (<div title="text"/>)
    itemGroupKey: 'group',
    itemTimeStartKey: 'startTime',
    itemTimeEndKey: 'endTime',
}

export function ResourceTimeline(props: ResourceTimelineProps) {



    return (<Timeline
        groups={props.groups}
        items={addColorToItems(props.items)}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
        keys={keys}
        canChangeGroup
        onItemSelect={(itemId, e, time) => {
            console.log(itemId);
            props.setSelectedItem(itemId as string);
        }}
    >
        <TimelineMarkers>
            <TodayMarker interval={10} date={moment().toDate()} />
            <CursorMarker />
        </TimelineMarkers>
    </Timeline>
    )
}

function addColorToItems(items: CustomTimelineItem[]) {

    return items.map(item => {
        return {
            ...item,
            title: item.assignee + "-" + item.title,
            itemProps: {
                'aria-hidden': true,
                onDoubleClick: () => { console.log('You clicked double!') },
                className: 'weekend',
                style: {
                    'background': generateRandomColor(item.assignee),
                    'text-align': 'center'
                }
            }
        }
    });
}

function generateRandomColor(key: string) {

    if (colorMap.has(key)) {
        return colorMap.get(key);
    }

    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    let rNumber = randomNumber.toString(16);
    let randColor = rNumber.padStart(6, "0");
    const color = `#${randColor.toUpperCase()}`;
    colorMap.set(key, color);
    return color
}