"use client";
import { useState, useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerStudentSchema } from "@/validations/registrationValidation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const officeData = [
  { id: 1, name: "Office 1" },
  { id: 2, name: "Office 2" },
  { id: 3, name: "Office 3" },
  // Add more office data here
];
const collegeData = [
  { id: 1, name: "College of Computing and Informatics" },
  { id: 2, name: "Engineering" },
  { id: 3, name: "Social sciences and Humanities" },
  { id: 4, name: "College of behavioral science" },

  // Add more office data here
];
const RegisterStudent = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(registerStudentSchema) });

  const Items = [1, 2, 3, 4, 5, 6, 7];
  const programs = ["Regular", "Weekend"];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCollege, setSearchCollege] = useState("");

  const [filteredOffices, setFilteredOffices] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const collegeDropdownRef = useRef(null); // Add a new ref for the college dropdown

  const initialDropdownItems = officeData.slice(0, 1);
  const initialDropdownColleges = collegeData.slice(0, 1);

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
    setValue("departmentName", officeName);

    setSearchTerm(officeName);
    setShowDropdown(false);
  };
  const handleSearchCollegeChange = (event) => {
    setSearchCollege(event.target.value);
    setShowCollegeDropdown(true);
  };

  const handleDropdownCollegeClick = (collegeName) => {
    setValue("collegeName", collegeName);

    setSearchCollege(collegeName);
    setShowCollegeDropdown(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Office registered Successfully!");
    reset();
  };

  return (
    <div class="w-full max-w-142.5 rounded-lg bg-white py-12 px-8  dark:bg-boxdark md:py-15 md:px-8.5">
      <h3 class="pb-2 text-left text-lg font-bold text-black dark:text-white sm:text-2xl">
        Register Student
      </h3>
      <span class="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="phoneNumber"
            >
              First Name
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="student's name"
              {...register("firstName")}
            />
            <p>{errors.firstName?.message}</p>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="fullName"
            >
              Middle Name
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="middleName"
                id="middleName"
                placeholder="Father's name"
                {...register("middleName")}
              />
              <p>{errors.middleName?.message}</p>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="phoneNumber"
            >
              Last Name
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Grand father's Name"
              {...register("lastName")}
            />
            <p>{errors.lastName?.message}</p>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="phoneNumber"
            >
              Student Id
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="studentId"
              id="studentId"
              placeholder=".../..../.."
              {...register("studentId")}
            />
            <p>{errors.studentId?.message}</p>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              College
            </label>
            <input
              type="text"
              name="collegeName"
              id="collegeName"
              placeholder="Search for a college..."
              value={searchCollege}
              onFocus={handleSearchCollegeFocus}
              onChange={handleSearchCollegeChange}
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              //   {...register("collegeName")}
            />
            <p>{errors.collegeName?.message}</p>

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

          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="phoneNumber"
            >
              Department
            </label>
            <input
              type="text"
              name="departmentName"
              id="departmentName"
              placeholder="Search for an office..."
              value={searchTerm}
              onFocus={handleSearchInputFocus}
              onChange={handleSearchInputChange}
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              //  {...register("departmentName")}
            />
            <p>{errors.departmentName?.message}</p>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="w-full py-1 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
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
        </div>
        <div className="relative mb-5.5">
          <label className=" block text-sm font-medium text-black dark:text-white">
            Year
          </label>
          <div className="grid grid-cols-7">
            {Items.map((item) => (
              <div key={item} className="flex pt-4 min-w-47.5">
                <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center">
                  <input
                    className="text-primary"
                    type="radio"
                    name="year"
                    id={`year${item}`}
                    value={item}
                    {...register("year")}
                  />
                </span>
                <div className="w-full">
                  <p className="font-semibold text-primary dark:text-gray">
                    {item}
                  </p>
                </div>
              </div>
            ))}{" "}
          </div>
          <p>{errors.year?.message}</p>
        </div>
        <div className="relative ">
          <label className=" block text-sm font-medium text-black dark:text-white">
            Program
          </label>
          <div className="grid grid-cols-4">
            {programs.map((item) => (
              <div key={item} className="flex pt-4 min-w-47.5">
                <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center">
                  <input
                    className="text-primary"
                    type="radio"
                    name="program"
                    id={`program${item}`}
                    {...register("program")}
                  />
                </span>
                <div className="w-full">
                  <p className="font-semibold text-primary dark:text-gray">
                    {item}
                  </p>
                </div>
              </div>
            ))}{" "}
          </div>
          <p>{errors.program?.message}</p>
        </div>

        <div class="-mx-3 mt-10 flex flex-wrap gap-y-4">
          <div class="w-full px-3 2xsm:w-1/2">
            <button
              type="submit"
              class="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              Save
            </button>
          </div>

          <div class="w-full px-3 2xsm:w-1/2">
            <button class="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterStudent;
