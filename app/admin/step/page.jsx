// "use client"
// import { useState } from 'react';

// const StepsComponent = () => {
//     const [steps, setSteps] = useState({
//         Head: ["College Dean"],
//         "College Dean": [
//             "Dormitory",
//             "Cafteria",
//             "Sport And Recreation",
//             "College Book Store",
//         ],
//         Dormitory: ["Dean Of Student"],
//         Cafteria: ["Dean Of Student"],
//         "Sport And Recreation": ["Dean Of Student"],
//         "College Book Store": ["Library Chief"],
//         "Dean Of Student": ["Registrar"],
//         "Library Chief": ["Registrar"],
//         Registrar: ["APPROVED"],
//     });
//     console.log("steps", steps);
//     // Function to add an item to the array associated with a key
//     const addItem = (key, value) => {
//         if (key !== value) {
//             setSteps(prevSteps => ({
//                 ...prevSteps,
//                 [key]: [...prevSteps[key], value],
//             }));
//         }

//     };

//     // Function to remove an item from the array associated with a key
//     const removeItem = (key, value) => {
//         setSteps(prevSteps => ({
//             ...prevSteps,
//             [key]: prevSteps[key].filter(item => item !== value),
//         }));
//     };
//     const [keys, setKeys] = useState(Object.keys(steps));
//     console.log("keys", keys);
//     //   {Object.entries(steps).map(([key, values]) => (

//     //   ))}

//     return (
//         <div>
//             {/* Render the current steps */}
//             {Object.entries(steps).map(([key, values]) => (
//                 <div key={key}>
//                      {/* Input field to add a new value */}
//                      <input type="text" value={key} />
//                     <ul>
//                         {/* Render the values associated with the current key */}
//                         {values.map(value => (
//                             (value !== key ) && (
//                                 <li key={value}>{value}
//                                     <button onClick={() => removeItem(key, value)}>-</button>
//                                 </li>
//                             )

//                         ))}
//                     </ul>

//                     <ul>
//                         {/* Render the values associated with the current key */}
//                         {keys.map(value => (
//                            ( value !== key&& !steps[key].includes(value)) && (
//                                 <li key={value}>{value}
//                                     <button onClick={() => addItem(key, value)}>+</button>
//                                 </li>
//                             )
//                         ))}
//                     </ul>

//                 </div>
//             ))}
//         </div>
//     );
// };

// export default StepsComponent;


"use client";
import { useState, useEffect } from "react";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-toastify";
const StepsComponent = () => {
    const [keyValuePairs, setKeyValuePairs] = useState({});

    const [steps, setSteps] = useState({
        Head: ["College Dean"],
        "College Dean": [
            "Dormitory",
            "Cafteria",
            "Sport And Recreation",
            "College Book Store",
        ],
        Dormitory: ["Dean Of Student"],
        Cafteria: ["Dean Of Student"],
        "Sport And Recreation": ["Dean Of Student"],
        "College Book Store": ["Library Chief"],
        "Dean Of Student": ["Registrar"],
        "Library Chief": ["Registrar"],
        Registrar: ["APPROVED"],
    });
    // const [steps, setSteps] = useState({});
    const [selectedKey, setSelectedKey] = useState(null); // State for selected key
    //  setSteps({"yes":["College Dean"]})
    const [stepData, setStepData] = useState();
    const [stepError, setStepError] = useState(null)
    console.log("ooooo", steps);
    useEffect(() => {
        console.log("ooooo");
        const fetchData = async () => {
            try {
                const stepType = "STUDENT"; // Define your stepType here
                const url = new URL("http://localhost:3000/api/steps");
                url.searchParams.append("stepType", stepType);

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const updatedData = data.map((user) => ({
                    ...user,
                    id: user._id,
                }));
                setStepData(data);

                console.log("setDraggedData", data);
            } catch (error) {
                setStepError(error);
            }
        };


        fetchData(); // Fetch data once when component mounts

        // No cleanup or dependency array needed as we only want to fetch data once
    }, []);

    if (stepData) {

        console.log("stepData ", stepData[0])
    }

    // Render loading state
    if (!stepData && !stepError) {
        return <p>Loading...</p>;
    }

    // Render error state
    //   if (stepError) {
    //     console.error("Error fetching data:", stepError);
    //     return <p>Failed to fetch data</p>;
    //   }





    const list = [];
    console.log("stepData[0].name", stepData[0].name);
    // for (let index = 0; index < stepData[0].length; index++) {
    //     const key =stepData[0].name;
    //     list.push(key);
    // }
    //     stepData[0].name.forEach(element => {
    //         list.push(element);

    //    });
    const data = stepData[0];
    // console.log("data",data);
    for (let index = 0; index < stepData.length; index++) {

        Object.keys(data).forEach(key => {
            // console.log("key",key);
            if (key === 'name') {
                list.push(data[key]);
            }
        });
    }
    const values = stepData[0].nextSteps;



    // const keys = Object.keys(steps);
    // const values = Object.values(steps);
    console.log("list", list);
    const modifySteps = async (key,value) => {
        setSteps(prevSteps => ({
            ...prevSteps,
            newProperty: ["New Value"],
            // You can add more properties here if needed
        }));
// donot delete the commit
        // try {
        //     const response = await fetch("/api/steps", {
        //         method: "POST",
        //         body: JSON.stringify({
        //             steps,
        //             stepType: "STUDENT"
        //         }),
        //     });
        //     if (response.ok) {
        //         console.log("Steps created successfully!");
        //         // Optionally, you can redirect or show a success message here
        //     } else {
        //         console.error("Failed to create steps");
        //         // Handle the error, maybe show an error message to the user
        //     }
        // } catch (error) {
        //     console.error("Error creating steps:", error);
        //     // Handle any unexpected errors
        // }




        try {
            const response = await fetch("/api/steps", {
                method: "PATCH",
                body: JSON.stringify({
                    key,
                    value,
                    stepType: "STUDENT"
                }),
            });
            if (response.ok) {
                toast.success("Steps updated successfully!")
                console.log("Steps updated successfully!");
                console.log("keyValuePairs", keyValuePairs);
                // Optionally, you can redirect or show a success message here
            } else {
                console.error("Failed to create steps");
                // Handle the error, maybe show an error message to the user
            }
        } catch (error) {
            console.error("Error creating steps:", error);
            // Handle any unexpected errors
        }

    }

    // const keyValuePairs = {};
    stepData.forEach((data, index) => {
        keyValuePairs[data.name] = data.nextSteps;
    });


    // const addItem = (key, value) => {
    //     if (key !== value && key !== "Select a Step") {
    //         {

    //             const updatedSteps = { ...prevSteps };
    //             updatedSteps[key] = [...updatedSteps[key], value];
    //             return updatedSteps;
    //             // keyValuePairs?.map((data, index) => (
                   
    //             //     setSteps((prevSteps) => ({
    //             //         ...prevSteps,
    //             //         [key]: [...prevSteps[key], value],
    //             //     }))
    //             // ))
    //         }


    //     }
    // };

    const addItem = (key, value) => {
        keyValuePairs[key].push(value)
        console.log("ttttttttttttttttttttt","yyy",value);
        if (key !== value && key !== "Select a Step") {
            setKeyValuePairs(prevKeyValuePairs => {
                const updatedPairs = { ...prevKeyValuePairs };
                updatedPairs[key] = [...(updatedPairs[key] || []), value];
                return updatedPairs;
            });
        }
        console.log("ttttttttttttttttttttt","yyy",keyValuePairs);
    };
    

    const removeItem = (key, value) => {
        keyValuePairs[key].pop(value);
        setSteps((prevSteps) => ({
            ...prevSteps,
            [key]: prevSteps[key].filter((item) => item !== value),
        }));
    };


    console.log("steps", steps);

    

    // Iterate over the key-value pairs of the object
    Object.entries(keyValuePairs).forEach(([key, value]) => {
        console.log("Key:", key);
        console.log("Value:", value);
    });
    const keys = Object.keys(keyValuePairs);
    const value = Object.values(keyValuePairs);

    return (
        <div>

            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5">
                    <h3 class="font-medium text-black dark:text-white"></h3></div>
                <div class="p-4 sm:p-6 xl:p-10">
                    <div class="relative mb-50 inline-block">

                        <select class="ml-7  inline-flex items-center gap-2.5 rounded-md dark:bg-boxdark px-5.5 py-3 font-medium text-white dark:border-strokedark dark:text-white" value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
                            <option value={null}>Select a Step</option>
                            {stepData.map((data, key) => (
                                <option key={key} value={data.name}>
                                    {data.name}

                                </option>
                            ))}
                        </select>
                        <div className="flex gap-15 sm:flex sm:flex-col">

                            {/* && !stepData[selectedKey]?.includes(value.name )  */}

                            {/* List of available values to add (Right Box - Minus) */}
                            <div className="mt-5">
                                <ul className="pl-5 py-3  ">
                                    {Object.entries(keyValuePairs).map(([key, value]) => (
                                        (key !== selectedKey && !keyValuePairs[selectedKey]?.includes(key)) && (
                                            <div key={key}>
                                                <li className="relative w-1/1.5 flex space-x-3 border rounded p-2 bg-gray-100 mb-5 mr-3">
                                                    <div className="justify-center">{key}</div>
                                                    <button className="flex flex-1 justify-end" onClick={() => addItem(selectedKey, key)}>
                                                        {/* <ArrowCircleRightIcon /> */}
                                                        <AddIcon />
                                                    </button>
                                                </li>
                                            </div>
                                        )
                                    ))}

                                </ul>
                            </div>
                            {/* rounded-md border border-stroke bg-white shadow-default dark:border-black dark:bg-black */}
                            {/* remover */}
                            <div className="mt-5 " >
                                <ul className="pl-5 py-3">
                                    {keyValuePairs[selectedKey]?.map((value) => (
                                        <li className="relative w-1/1.5 flex space-x-3 border rounded p-2 bg-gray-100 mb-5 mr-3" key={value}>
                                           
                                            <button className="flex flex-1 justify-start" onClick={() => removeItem(selectedKey, value)}>
                                                {/* <ArrowCircleLeftIcon /> */}
                                                <HorizontalRuleIcon />
                                            </button>
                                            <div className="justify-center">{value}</div>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className=" w-full px-1 ">
                            <button
                                
                                onClick={() => modifySteps(selectedKey, keyValuePairs[selectedKey])}
                                className="ml-5 block w-60 rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                            >
                                Save
                            </button>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    );
};

export default StepsComponent;
