"use client"
import { useState, useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerOfficerSchema } from "@/validations/registrationValidation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CollegeData, DepartmentData, ROLES } from "@/utils/constants";
import * as XLSX from "xlsx";

const RegisterStaff = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(registerOfficerSchema) });
  let keys = [];

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedPrevilege, setSelectedPrevilege] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCollege, setSearchCollege] = useState("");
  const [searchPrevilege, setSearchPrevilege] = useState("");

  const [filteredOffices, setFilteredOffices] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filteredPrevilege, setFilteredPrevilege] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const [showPrevilegeDropdown, setShowPrevilegeDropdown] = useState(false);

  const collegeDropdownRef = useRef(null);
  const dropdownRef = useRef(null);
  const previlegeDropdownRef = useRef(null);

  const initialDropdownItems = DepartmentData.slice(0, 1);
  const initialDropdownColleges = CollegeData.slice(0, 1);
  // const initialDropdownPrivilege = privilegeData.slice(0, 1);

  // let previlege={};
  const [Previlege, setPrevilege] = useState([])


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


  const handleSearchPrevilegeFocus = () => {
    if (searchPrevilege) {
      setShowPrevilegeDropdown(true);
    } else {
      setFilteredPrevilege(Previlege);
      setShowPrevilegeDropdown(true);
    }
  };





  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffStepType = "STAFF"; // Define your stepType here
        const studentStepType = "STUDENT"


        const staffUrl = new URL("http://localhost:3000/api/step");
        staffUrl.searchParams.append("stepType", staffStepType);
        const responseStaff = await fetch(staffUrl);
        // fetch students step
        const studentUrl = new URL("http://localhost:3000/api/step");
        studentUrl.searchParams.append("stepType", studentStepType);
        const responseStudent = await fetch(studentUrl);



      // fetch steps data for the dropdown of privilege

        try {
          const fetchedData = await fetch(`/api/steps`);
          if (!fetchedData.ok) {
            throw new Error(`Failed to fetch data. Status: ${fetchedData.status}`);
          }
          const data = await fetchedData.json();
          const keyValuePairs = {};
          data.forEach((item) => {
            keyValuePairs[item.name] = item.nextSteps;
          });
           keys = Object.keys(keyValuePairs);
          const values = Object.values(keyValuePairs);
          console.log("keys fetch", keys, ">> values", values);
        } catch (error) {
          console.error('Error fetching or processing data:', error);
        }


        if (!responseStaff.ok && !responseStudent.ok) {
          throw new Error("Network responseStaff was not ok");
        }
        const staffData = await responseStaff.json();
        const updatedStaffData = staffData.map((user) => ({
          ...user,
          id: user._id,
        }));


        const studentData = await responseStudent.json();
        const updatedStudentData = studentData.map((user) => ({
          ...user,
          id: user._id,
        }));

        // Assuming setStepData and setStepError are state updating functions
        // setStepData(updatedStaffData);
        // setDraggedData(updatedStaffData[0].steps);
        const concatenatedArray = [
          ...updatedStaffData[0].steps.filter(step => step !== "APPROVED"),
          ...updatedStudentData[0].steps.filter(step => step !== "APPROVED")
        ];
        const previlege = keys.map((role, index) => ({
          id: (index + 1).toString(),
          name: role
        }));

        setPrevilege(previlege);


        //   console.log("Data fetched successfully:", previlege);
        //  console.log("initialDropdownPrivilege", initialDropdownPrivilege);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
        // setStepError(error);
      }
    };

    fetchData(); // Fetch data once when component mounts



    if (searchCollege) {

      const filteredResults = CollegeData.filter((college) =>
        college.name.toLowerCase().includes(searchCollege.toLowerCase())
      );
      setFilteredColleges(filteredResults);
    } else {
      setFilteredColleges(initialDropdownColleges);
    }

    if (searchTerm) {

      const filteredResults = DepartmentData.filter((college) =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOffices(filteredResults);
    } else {
      setFilteredOffices(initialDropdownItems);
    }


    if (searchPrevilege) {
      // console.log("concatPrevilegeenatedArray",Previlege);
      // console.log("privilegeData",privilegeData);
      const filteredResults = Previlege.filter((college) =>
        college.name.toLowerCase().includes(searchPrevilege.toLowerCase())
      );
      setFilteredPrevilege(filteredResults);
    }
    //  else {
    //   setFilteredPrevilege(filteredResults);
    // }
  }, [searchTerm, DepartmentData, searchCollege, searchPrevilege]);







  useEffect(() => {
    function handleClickOutside(event) {
      if (collegeDropdownRef.current && !collegeDropdownRef.current.contains(event.target)) {
        setShowCollegeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (previlegeDropdownRef.current && !previlegeDropdownRef.current.contains(event.target)) ||
        (previlegeDropdownRef.current &&
          !previlegeDropdownRef.current.contains(event.target))
      ) {
        setShowPrevilegeDropdown(false);
        setShowPrevilegeDropdown(false);
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


  const handleSearchPrevilegeChange = (event) => {
    setSearchPrevilege(event.target.value);
    setShowDropdown(true);
  };



  const handleDropdownItemClick = (office) => {
    setValue("departmentName", office.name);
    setValue("departmentId", office.id);
    setSelectedCollege(office);

    setSearchTerm(office.name);
    setShowDropdown(false);
  };

  const handleDropdownPrevilegeItemClick = (office) => {
    setValue("previlegeName", office.name);
    setValue("previlegeId", office.id);
    setSelectedPrevilege(office);

    setSearchPrevilege(office.name);
    setShowPrevilegeDropdown(false);
  };

  const handleSearchCollegeChange = (event) => {
    setSearchCollege(event.target.value);
    setShowCollegeDropdown(true);
  };

  const handleDropdownCollegeClick = (college) => {
    setValue("collegeName", college.name);
    // toast.success("rerrrrr!",college.name," ",college.id);
    setValue("collegeId", college.id);
    setSelectedCollege(college);
    setSearchCollege(college.name);
    setShowCollegeDropdown(false);
  };

  const onSubmit = async (data) => {
    const fromFirstName = data.firstName.toLowerCase();
    const fromMiddleName = data.middleName.charAt(0).toLowerCase();
    const password = `${fromFirstName}@${fromMiddleName}1234`;

    try {
      const response = await fetch("/api/user/new", {
        method: "POST",
        body: JSON.stringify({
          userId: data.studentId,
          firstname: data.firstName,
          middlename: data.middleName,
          lastname: data.lastName,
          password: password,
          privilege: data.previlegeName,
          collegeName: data.collegeName,
          departmentName: data.departmentName,
          role: ROLES.STAFF,
          blockNo: ""
        }),
      });

      if (response.ok) {
        toast.success("Officer registered Successfully!");
      }
    } catch (error) {

      console.log(error);
    }
    setSearchCollege("");
    reset();
  };


  return (
    <div className="w-full max-w-142.5 rounded-lg bg-white py-12 px-8  dark:bg-boxdark md:py-15 md:px-8.5">
      <div className="flex flex-row place-content-between">
        <div>
          <h3 className="pb-2 text-left text-lg font-bold text-black dark:text-white sm:text-2xl">
            Register Staff
          </h3>
          <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
        </div>


      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="firstName"
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
              htmlFor="middleName"
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
              htmlFor="lastName"
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
              htmlFor="studentId"
            >
              user Id
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
            {/* <input
              type="hidden"
              name="collegeId"
              id="collegeId"
              value={selectedCollege ? selectedCollege.id : ""}
            /> */}

            <p>{errors.collegeName?.message}</p>

            {showCollegeDropdown && (
              <div
                ref={collegeDropdownRef} // Use the college dropdown ref
                className="w-full py-1 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              >
                {filteredColleges.map((college) => (
                  <div
                    key={college.id}
                    onClick={() => handleDropdownCollegeClick(college)}
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
            <input
              type="hidden"
              name="departmentId"
              id="departmentId"
              value={selectedDepartment ? selectedDepartment.id : ""}
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
                    onClick={() => handleDropdownItemClick(office)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 hover:bg-bodydark1 dark:hover:bg-body"
                  >
                    {office.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Previlege
            </label>
            <input
              type="text"
              name="previlegeName"
              id="previlegeName"
              placeholder="Search for a previlege..."
              value={searchPrevilege}
              onFocus={handleSearchPrevilegeFocus}
              onChange={handleSearchPrevilegeChange}
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            //   {...register("collegeName")}
            />
            {/* <input
          type="hidden"
          name="collegeId"
          id="collegeId"
          value={selectedCollege ? selectedCollege.id : ""}
        /> */}

            <p>{errors.collegeName?.message}</p>

            {showPrevilegeDropdown && (
              <div
                ref={previlegeDropdownRef} // Use the college dropdown ref
                className="w-full py-1 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              >
                {filteredPrevilege.map((previlege) => (
                  <div
                    key={previlege.id}
                    onClick={() => handleDropdownPrevilegeItemClick(previlege)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 hover:bg-bodydark1 dark:hover:bg-body"
                  >
                    {previlege.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="blockNo"
            >
             Dorm Block
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="blockNo"
              id="blockNo"
              placeholder="block No"
              {...register("blockNo")}
            />
            <p>{errors.blockNo?.message}</p>
          </div> */}
        </div>

        <div className="-mx-3 mt-10 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              type="submit"
              className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              Save
            </button>
          </div>

          <div className="w-full px-3 2xsm:w-1/2">
            <button className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterStaff;


