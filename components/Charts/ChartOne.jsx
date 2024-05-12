"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: ["On Process", "Already Approved", "Currently Rejected"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 5,
  },
};

const ChartOne = ({
  adminStaffClearance,
  academicStaffClearance,
  studentsClearance,
}) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const updateSeriesData = (clearanceData) => {
      const onProcessCount = clearanceData.filter(
        (item) =>
          !item.status.includes("APPROVED") && item.rejections.length === 0
      ).length;

      const approvedCount = clearanceData.filter((item) =>
        item.status.includes("APPROVED")
      ).length;

      const currentlyRejectedCount = clearanceData.filter(
        (item) => item.rejections.length > 0
      ).length;

      return [onProcessCount, approvedCount, currentlyRejectedCount];
    };

    // Update series data for students clearance
    const studentsSeriesData = updateSeriesData(studentsClearance);
    const academicStaffSeriesData = updateSeriesData(academicStaffClearance);
    const adminStaffSeriesData = updateSeriesData(adminStaffClearance);

    setSeries([
      {
        name: "Student's Clearance",
        data: studentsSeriesData,
      },
      {
        name: "Academic Staff's Clearance",
        data: academicStaffSeriesData,
      },
      {
        name: "Admin Staff's Clearance",
        data: adminStaffSeriesData,
      },
    ]);
  }, [studentsClearance, academicStaffClearance]);

  // const handleReset = () => {
  //   setSeries((prevState) => [...prevState]);
  // };

  const isWindowAvailable = () => typeof window !== "undefined";

  if (!isWindowAvailable()) return <></>;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <div className="w-full">
              <p className="font-semibold text-lg text-primary">
                Clearance Status Overviews
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5 h-[355px] w-[105%]">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
