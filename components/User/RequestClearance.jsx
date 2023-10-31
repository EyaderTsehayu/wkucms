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

    const handleTaskSelection = (task) => {
        setSelectedTask(task);
    };

    const handleSend = () => {
        // Handle the action for the "Send" button here.
        alert(`Sending the selected task: ${selectedTask}`);
    };


    return (
        <div className="md:mt-7 mt-4 md:py-7 py-4 2xl:h-[60vh] border shadow-default flex flex-col  rounded-lg bg-white  border-bodydark1  dark:border-strokedark dark:bg-boxdark">
            <div className='px-4 sm:px-7'>
                <h5 className="dark:text-white font-satoshi text-4xl font-bold mb-4 text-primary sm:text-left">
                    Choose the cause for your clearance
                </h5>
                <div className='pt-5  grid grid-cols-6  sm:gap-6 gap-4'>
                    <div className="md:ml-26 ml-4 grid grid-cols-1 lg:grid-cols-2 col-span-3 xl:gap-8 gap-5" >
                        {request.map((req) => (
                            <label htmlFor={req.value} className="cursor-pointer text-primary text-lg font-md" key={req.value}>
                                <div className="flex items-center pt-0.5">
                                    <input
                                        type="radio"
                                        id={req.value}
                                        name="task-radio-group"
                                        value={req.value}
                                        checked={selectedTask === req.value}
                                        onChange={() => handleTaskSelection(req.value)}
                                        className="dark:text-white marker:text-white"

                                    />
                                    <div className="dark:text-white box  flex h-5 w-5 items-center justify-center  dark-border-strokedark ">
                                        <span className={`text-white ${selectedTask === req.value ? 'opacity-100' : 'opacity-0'}`}>

                                        </span>
                                    </div>
                                    <p className='dark:text-white'>{req.label}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
                <button
                    className="md:ml-26 ml-4 mt-10 flex text-lg justify-center rounded-lg bg-primary py-3 px-6 font-semibold text-gray hover:bg-opacity-95"
                    type="submit"
                >
                    Send Request
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
