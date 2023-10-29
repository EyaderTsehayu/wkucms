import Radio from '@mui/material/Radio';
import { FormControl, FormControlLabel, RadioGroup } from '@mui/material';
import React, { useState } from 'react';

const request = [
    {
        value: "Withdrawal",
        label: "Withdrawal"
    },
    {
        value: "Campus Residency",
        label: "Campus Residency"
    },
    {
        value: "Dismissal",
        label: "Dismissal"
    },
    {
        value: "Graduation",
        label: "Graduation"
    },
    {
        value: "Job Relocation",
        label: "Job Relocation"
    },
    {
        value: "End of Contract",
        label: "End of Contract"
    },
    {
        value: "Resignation",
        label: "Resignation"
    },
];

const TaskItem = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const handleTaskSelection = (task) => {
        setSelectedTask(task);
    };

    const toggleDropDown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    return (
        <div
            draggable="true"
            className="mt-7 task relative flex cursor-move justify-between rounded-lg border border-bodydark1 bg-white p-7 shadow-default dark:bg-boxdark dark:border-strokedark dark-bg-boxdark"
        >
            <div>
                <h5 className="ml-30 dark:text-white font-satoshi text-2xl font-bold mb-7 text-black">
                    Choose the cause for your clearance
                </h5>
                <div className="flex flex-col gap-2 ml-30 dark:text-white">
                    <label htmlFor="taskRadio1" className="cursor-pointer">
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="clearance-cause"
                                defaultValue="Withdrawal"
                                name="radio-buttons-group-1"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4,1fr)',
                                    gridGap: '10px',
                                    paddingBottom: "10px"
                                }}
                            >
                                {request.map((req) => (
                                    <FormControlLabel
                                        key={req.value}
                                        value={req.value}
                                        control={<Radio className=' dark:text-white' />}
                                        label={req.label}
                                    />
                                ))}
                            </RadioGroup>
                            <button
                                className="w-10 mt-12 inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover-bg-opacity-90 lg:px-8 xl:px-10"
                                type="button"
                            >
                                SEND
                            </button>
                        </FormControl>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
