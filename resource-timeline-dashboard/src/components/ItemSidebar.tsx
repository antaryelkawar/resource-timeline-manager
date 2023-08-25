import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import _ from 'lodash';
import { Button } from 'primereact/button';
import * as RestClient from "../utils/RestClient"
import { Calendar } from "primereact/calendar";
import { CustomTimelineGroup, CustomTimelineItem } from '../models/TimelineModel';
import { Dropdown } from 'primereact/dropdown';
import { v4 as uuid } from 'uuid';

const hours = _.range(24).map(hour => { return { name: hour, value: hour } });

interface ItemSidebarProps {
    show: boolean;
    setShow: (val: boolean) => void;
    setNeedsRefresh: (val: boolean) => void;
    selectedItem: CustomTimelineItem;
}

export const ItemSidebar = (props: ItemSidebarProps) => {

    const [groups, setGroups] = useState<CustomTimelineGroup[]>([]);

    useEffect(() => {
        RestClient.getGroups().then(response => setGroups(response))
    }, [props.show]);

    useEffect(() => {

        if (!props.selectedItem) {
            formik.resetForm();
            return;
        }

        let startDate = new Date(props.selectedItem.startTime)
        let endDate = new Date(props.selectedItem.endTime)

        let newValues = {
            id: props.selectedItem.id,
            title: props.selectedItem.title,
            group: groups.find(group => group.id === props.selectedItem.group),
            assignee: props.selectedItem.assignee,
            startDate: startDate,
            startTime: startDate.getHours(),
            endDate: endDate,
            endTime: endDate.getHours()
        }

        formik.setValues(newValues)

        console.log(newValues);

    }, [props.selectedItem]);

    const formik = useFormik({
        initialValues: {
            id: undefined,
            title: undefined,
            group: undefined,
            assignee: undefined,
            startDate: undefined,
            startTime: undefined,
            endDate: undefined,
            endTime: undefined
        },
        onSubmit: values => {

            (values.startDate as Date).setHours(values.startTime);
            (values.endDate as Date).setHours(values.endTime);

            let item: CustomTimelineItem = {
                id: values.id ? values.id : uuid(),
                title: values.title,
                group: values.group.id,
                assignee: values.assignee,
                startTime: values.startDate.getTime(),
                endTime: values.endDate.getTime(),
                start_time: values.startDate.getTime(),
                end_time: values.endDate.getTime()
            }

            RestClient.createItem(item).then(() => {
                props.setNeedsRefresh(true);
                props.setShow(false);
            })
        },
    });
    return (
        <Sidebar visible={props.show} position="right" onHide={() => props.setShow(false)} className="w-full md:w-20rem lg:w-30rem">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <h2>{"Book Resource"}</h2>
                <InputText
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <Dropdown
                    id="group"
                    name="group"
                    options={groups}
                    optionLabel="title"
                    placeholder="Group"
                    onChange={(e) => {
                        formik.setFieldValue('group', e.value);
                    }}
                    value={formik.values.group}
                />
                <InputText
                    id="assignee"
                    name="assignee"
                    type="text"
                    placeholder="Assignee"
                    onChange={formik.handleChange}
                    value={formik.values.assignee}
                />
                <div className='flex inline'>
                    <Calendar
                        id="startDate"
                        name="startDate"
                        placeholder='Start Date'
                        value={formik.values.startDate}
                        onChange={(e) => {
                            formik.setFieldValue('startDate', e.target.value);
                        }}
                    />
                    <Dropdown
                        inputId="startTime"
                        name="startTime"
                        value={formik.values.startTime}
                        options={hours}
                        optionLabel="name"
                        placeholder="Start Time"
                        onChange={(e) => {
                            formik.setFieldValue('startTime', e.value);
                        }}
                    />
                </div>

                <div className='inline'>
                    <Calendar
                        id="endDate"
                        name="endDate"
                        placeholder='End Date'
                        value={formik.values.endDate}
                        onChange={(e) => {
                            formik.setFieldValue('endDate', e.target.value);
                        }}
                    />
                    <Dropdown
                        inputId="endTime"
                        name="endTime"
                        value={formik.values.endTime}
                        options={hours}
                        optionLabel="name"
                        placeholder="End Time"
                        onChange={(e) => {
                            formik.setFieldValue('endTime', e.value);
                        }}
                    />
                </div>

                <Button type="submit" label='Submit' />
            </form>
        </Sidebar>
    );
};
