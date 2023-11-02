"use client";

// import { useState, useEffect, useRef } from "react";
// const Filter = ({ officeData, collegeData }) => {
//   const Items = [1, 2, 3, 4, 5, 6, 7];

//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchCollege, setSearchCollege] = useState("");

//   const [filteredOffices, setFilteredOffices] = useState([]);
//   const [filteredColleges, setFilteredColleges] = useState([]);

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

//   const dropdownRef = useRef(null);

//   const initialDropdownItems = officeData.slice(0, 5);
//   const initialDropdownColleges = collegeData.slice(0, 5);

//   const handleSearchInputFocus = () => {
//     if (searchTerm) {
//       setShowDropdown(true);
//     } else {
//       setFilteredOffices(initialDropdownItems);
//       setShowDropdown(true);
//     }
//   };
//   const handleSearchCollegeFocus = () => {
//     if (searchTerm) {
//       setShowCollegeDropdown(true);
//     } else {
//       setFilteredColleges(initialDropdownColleges);
//       setShowCollegeDropdown(true);
//     }
//   };
//   useEffect(() => {
//     if (searchCollege) {
//       const filteredResults = collegeData.filter((college) =>
//         college.name.toLowerCase().includes(searchCollege.toLowerCase())
//       );
//       setFilteredColleges(filteredResults);
//     } else {
//       setFilteredColleges(initialDropdownItems);
//     }
//   }, [searchCollege, collegeData]);

//   useEffect(() => {
//     if (searchTerm) {
//       const filteredResults = officeData.filter((office) =>
//         office.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredOffices(filteredResults);
//     } else {
//       setFilteredOffices(initialDropdownItems);
//     }
//   }, [searchTerm, officeData]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//         setShowCollegeDropdown(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSearchInputChange = (event) => {
//     setSearchTerm(event.target.value);
//     setShowDropdown(true);
//   };
//   const handleDropdownItemClick = (officeName) => {
//     setSearchTerm(officeName);
//     setShowDropdown(false);
//   };
//   const handleSearchCollegeChange = (event) => {
//     setSearchCollege(event.target.value);
//     setShowCollegeDropdown(true);
//   };

//   const handleDropdownCollegeClick = (collegeName) => {
//     setSearchCollege(collegeName);
//     setShowCollegeDropdown(false);
//   };

//   return (
//     <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-3">
//       <div className="mb-4 justify-between gap-4 sm:flex">
//         <div>
//           <h4 className="text-xl font-semibold text-primary dark:text-white">
//             Filter students here
//           </h4>
//         </div>
//       </div>
//       <div className="mb-4 justify-between gap-4 sm:flex">
//         <div>
//           <div className="relative z-20 inline-block">
//             <select
//               name="#"
//               id="#"
//               className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
//             >
//               <option value="">This Week</option>
//               <option value="">Last Week</option>
//             </select>
//             <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
//               <svg
//                 width="10"
//                 height="6"
//                 viewBox="0 0 10 6"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
//                   fill="#637381"
//                 />
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
//                   fill="#637381"
//                 />
//               </svg>
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="flex w-full flex-wrap gap-3 sm:gap-3">
//         <p className="font-semibold text-primary">Year</p>
//         <div className="grid  grid-cols-3 ">
//           {Items.map((item) => (
//             <div key={item} className="flex min-w-47.5 ">
//               <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center ">
//                 <input className="text-primary" type="radio" />
//               </span>
//               <div className="w-full">
//                 <p className="font-semibold text-primary">{item}</p>
//               </div>
//             </div>
//           ))}{" "}
//         </div>

//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search for an office..."
//             value={searchTerm}
//             onFocus={handleSearchInputFocus}
//             onChange={handleSearchInputChange}
//             className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
//           />
//           {showDropdown && (
//             <div
//               ref={dropdownRef}
//               className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto z-10"
//             >
//               {filteredOffices.map((office) => (
//                 <div
//                   key={office.id}
//                   onClick={() => handleDropdownItemClick(office.name)}
//                   className="px-4 py-2 cursor-pointer hover:bg-blue-100"
//                 >
//                   {office.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search for an college..."
//             value={searchCollege}
//             onFocus={handleSearchCollegeFocus}
//             onChange={handleSearchCollegeChange}
//             className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
//           />
//           {showCollegeDropdown && (
//             <div
//               ref={dropdownRef}
//               className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto z-10"
//             >
//               {filteredColleges.map((college) => (
//                 <div
//                   key={college.id}
//                   onClick={() => handleDropdownCollegeClick(college.name)}
//                   className="px-4 py-2 cursor-pointer hover:bg-blue-100"
//                 >
//                   {college.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         {/*
//         <div className="flex min-w-47.5">
//           <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
//             <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
//           </span>
//           <div className="w-full">
//             <p className="font-semibold text-secondary">Total Sales</p>
//             <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Filter;
import { useState, useEffect, useRef } from "react";

const Filter = ({ officeData, collegeData }) => {
  const Items = [1, 2, 3, 4, 5, 6, 7];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCollege, setSearchCollege] = useState("");

  const [filteredOffices, setFilteredOffices] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const collegeDropdownRef = useRef(null); // Add a new ref for the college dropdown

  const initialDropdownItems = officeData.slice(0, 5);
  const initialDropdownColleges = collegeData.slice(0, 5);

  const handleSearchInputFocus = () => {
    if (searchTerm) {
      setShowDropdown(true);
    } else {
      setFilteredOffices(initialDropdownItems);
      setShowDropdown(true);
    }
  };
  const handleSearchCollegeFocus = () => {
    if (searchCollege) {
      setShowCollegeDropdown(true);
    } else {
      setFilteredColleges(initialDropdownColleges);
      setShowCollegeDropdown(true);
    }
  };
  useEffect(() => {
    if (searchCollege) {
      const filteredResults = collegeData.filter((college) =>
        college.name.toLowerCase().includes(searchCollege.toLowerCase())
      );
      setFilteredColleges(filteredResults);
    } else {
      setFilteredColleges(initialDropdownColleges);
    }
  }, [searchCollege, collegeData]);

  useEffect(() => {
    if (searchTerm) {
      const filteredResults = officeData.filter((office) =>
        office.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOffices(filteredResults);
    } else {
      setFilteredOffices(initialDropdownItems);
    }
  }, [searchTerm, officeData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target)) ||
        (collegeDropdownRef.current &&
          !collegeDropdownRef.current.contains(event.target))
      ) {
        setShowDropdown(false);
        setShowCollegeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    setShowDropdown(true);
  };
  const handleDropdownItemClick = (officeName) => {
    setSearchTerm(officeName);
    setShowDropdown(false);
  };
  const handleSearchCollegeChange = (event) => {
    setSearchCollege(event.target.value);
    setShowCollegeDropdown(true);
  };

  const handleDropdownCollegeClick = (collegeName) => {
    setSearchCollege(collegeName);
    setShowCollegeDropdown(false);
  };

  return (
    <div className="col-span-12 rounded-lg border  border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-3">
      <div className="mb-6 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-primary dark:text-white">
            Filter students here
          </h4>
        </div>
      </div>

      <div className="flex w-full flex-wrap  gap-3 sm:gap-8">
        <div className="relative">
          <p className="font-semibold text-primary mb-2 dark:text-white">
            College
          </p>
          <input
            type="text"
            placeholder="Search for a college..."
            value={searchCollege}
            onFocus={handleSearchCollegeFocus}
            onChange={handleSearchCollegeChange}
            className="w-full px-4 py-2 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          />
          {showCollegeDropdown && (
            <div
              ref={collegeDropdownRef} // Use the college dropdown ref
              className="w-full py-1 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            >
              {filteredColleges.map((college) => (
                <div
                  key={college.id}
                  onClick={() => handleDropdownCollegeClick(college.name)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 hover:bg-bodydark1 dark:hover:bg-body"
                >
                  {college.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <p className="mb-2 font-semibold text-primary dark:text-white">
            Department
          </p>
          <input
            type="text"
            placeholder="Search for an office..."
            value={searchTerm}
            onFocus={handleSearchInputFocus}
            onChange={handleSearchInputChange}
            className="w-full px-4 py-2 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          />
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="w-full py-1 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

              //  className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto z-10"
            >
              {filteredOffices.map((office) => (
                <div
                  key={office.id}
                  onClick={() => handleDropdownItemClick(office.name)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 hover:bg-bodydark1 dark:hover:bg-body"
                >
                  {office.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <p className="font-semibold text-primary mb-2 dark:text-white">
            Year
          </p>
          <div className="grid grid-cols-2">
            {Items.map((item) => (
              <div key={item} className="flex pt-4 min-w-47.5">
                <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center">
                  <input className="text-primary" type="radio" />
                </span>
                <div className="w-full">
                  <p className="font-semibold text-primary dark:text-gray">
                    {item}
                  </p>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
