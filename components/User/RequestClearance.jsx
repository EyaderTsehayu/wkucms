import { Button } from '@mui/material';
import React, { useState } from 'react';

const request = [
    {
        value: 'Withdrawal',
        label: 'Withdrawal',
    },
    {
        value: 'Campus Residency',
        label: 'Campus Residency',
    },
    {
        value: 'Dismissal',
        label: 'Dismissal',
    },
    {
        value: 'Graduation',
        label: 'Graduation',
    },
    {
        value: 'Job Relocation',
        label: 'Job Relocation',
    },
    {
        value: 'End of Contract',
        label: 'End of Contract',
    },
    {
        value: 'Resignation',
        label: 'Resignation',
    },
];

const TaskItem = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const handleTaskSelection = (task) => {
        setSelectedTask(task);
    };



    const handleSend = () => {
        // Handle the action for the "Send" button here.
        alert(`Sending the selected task: ${selectedTask}`);
    };

    return (
        <div className="mt-7 border border-bodydark1 task relative flex cursor-move justify-between rounded-sm bg-white py-7 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className='px-7'>
                <h5 className=" dark:text-white font-satoshi text-2xl font-bold mb-7 text-black">
                    Choose the cause for your clearance
                </h5>

                <div className="grid grid-cols-3 gap-5">
                    {request.map((req) => (
                        <label htmlFor={req.value} className="cursor-pointer" key={req.value}>
                            <div className="relative flex items-center pt-0.5">
                                <input
                                    type="radio"
                                    id={req.value}
                                    name="task-radio-group"
                                    value={req.value}
                                    checked={selectedTask === req.value}
                                    onChange={() => handleTaskSelection(req.value)}
                                    className="taskRadio sr-only dark:text-white"
                                />
                                <div className="gap-2  dark:text-white box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark-border-strokedark dark-bg-boxdark-2">
                                    <span className={`text-white ${selectedTask === req.value ? 'opacity-100' : 'opacity-0'}`}>
                                        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z" fill=""></path>
                                        </svg>
                                    </span>
                                </div>
                                <p className='dark:text-white'>{req.label}</p>
                            </div>
                        </label>
                    ))}
                </div>
                <button
                    className=" mt-7 ml-7 inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"

                >
                    Send
                </button>
            </div>



        </div>
    );
};

export default TaskItem;
