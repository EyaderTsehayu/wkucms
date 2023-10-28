import Radio from '@mui/material/Radio';
import { FormControl, FormControlLabel, RadioGroup } from '@mui/material';
import React, { useState } from 'react';

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
            className="mt-7 task relative flex cursor-move justify-between rounded-lg border border-bodydark1 bg-white p-7 shadow-default dark:border-strokedark dark-bg-boxdark"
        >
            <div>
                <h5 className="mb-7 text-lg font-medium text-black dark:text-white">
                    Choose the cause for your clearance
                </h5>
                <div className="flex flex-col gap-2">
                    <label htmlFor="taskRadio1" className="cursor-pointer">
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="clearance-cause"
                                defaultValue="Withdrawal"
                                name="radio-buttons-group-1"
                            >
                                <div className="flex space-x-10  text-body ">
                                    <div className="w-50 ">
                                        <FormControlLabel
                                            value="Withdrawal"
                                            control={<Radio />}
                                            label="Withdrawal"

                                        />
                                        <FormControlLabel
                                            value="CampusResidency"
                                            control={<Radio />}
                                            label="Campus Residency"
                                        />
                                        <FormControlLabel
                                            value="Dismissal"
                                            control={<Radio />}
                                            label="Dismissal"
                                        />
                                    </div>
                                    <div className="w-50">
                                        <FormControlLabel
                                            value="Graduation"
                                            control={<Radio />}
                                            label="Graduation"
                                        />
                                        <FormControlLabel
                                            value="JobRelocation"
                                            control={<Radio />}
                                            label="Job Relocation"
                                        />
                                        <FormControlLabel
                                            value="End of Contract"
                                            control={<Radio />}
                                            label="End of Contract"
                                        />
                                    </div>

                                    <div className="w-50">
                                        <FormControlLabel
                                            value="Resignation"
                                            control={<Radio />}
                                            label="Resignation"
                                        />

                                    </div>
                                </div>
                            </RadioGroup>
                            <button
                                className=" w-10 mt-12 inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                type="button"
                            >
                                SEND
                            </button>

                        </FormControl>
                    </label>
                </div>


            </div>

            <div className="absolute right-4 top-4">
                <div className="relative">
                    <button onClick={toggleDropDown}>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.25 11.25C3.49264 11.25 4.5 10.2426 4.5 9C4.5 7.75736 3.49264 6.75 2.25 6.75C1.00736 6.75 0 7.75736 0 9C0 10.2426 1.00736 11.25 2.25 11.25Z"
                                fill="#98A6AD"
                            ></path>
                            <path
                                d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                                fill="#98A6AD"
                            ></path>
                            <path
                                d="M15.75 11.25C16.9926 11.25 18 10.2426 18 9C18 7.75736 16.9926 6.75 15.75 6.75C14.5074 6.75 13.5 7.75736 13.5 9C13.5 10.2426 14.5074 11.25 15.75 11.25Z"
                                fill="#98A6AD"
                            ></path>
                        </svg>
                    </button>
                    {isDropDownOpen && (
                        <div className="absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark-border-strokedark dark-bg-boxdark">
                            <button className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover-bg-gray dark-hover-bg-meta-4">
                                <svg
                                    className="fill-current"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Edit icon */}
                                </svg>
                                Edit
                            </button>
                            <button className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover-bg-gray dark-hover-bg-meta-4">
                                <svg
                                    className="fill-current"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Delete icon */}
                                </svg>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskItem;

