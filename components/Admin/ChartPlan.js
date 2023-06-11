import React, { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js/auto';
import axios from 'axios';

const ChartPlan = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth2, setSelectedMonth2] = useState(currentMonth);
  const [selectedYear2, setSelectedYear2] = useState(currentYear);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Tạo danh sách các tháng từ 1 đến 12
  const months = [...Array(12).keys()].map((month) => month + 1);

  // Tạo danh sách các năm từ năm hiện tại đến năm 1900
  const years = [...Array(currentYear - 1900 + 1).keys()].map((year) => currentYear - year);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange2 = (e) => {
    setSelectedMonth2(parseInt(e.target.value));
  };

  const handleYearChange2 = (e) => {
    setSelectedYear2(parseInt(e.target.value));
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/subscriptions/count-by-plan?startMonth=${selectedMonth}&startYear=${selectedYear}&endMonth=${selectedMonth2}&endYear=${selectedYear2}`);
      const data = res.data;

      const chartData = data.map((plan) => plan.count); // Dữ liệu biểu đồ từ API
      const chartLabels = data.map((plan) => plan.type); // Nhãn cho các giá trị trong biểu đồ từ API

      const chartConfig = {
        type: 'pie',
        data: {
          labels: chartLabels,
          datasets: [
            {
              data: chartData,
              borderColor: [
                '#E53935',
                '#1E88E5',
                '#FDD835',
                '#2E7D32',
                '#BDBDBD',
                '#F4511E',
                '#6A1B9A',
                '#004D40',
                '#D81B60',
              ],
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0 ',
                '#E7E9ED',
                '#FF9F40',
                '#8c6eff',
                '#00b894',
                '#fd79a8',
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      };

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, chartConfig);

      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    };

    getData();
  }, [selectedMonth, selectedMonth2, selectedYear, selectedYear2]);

  return (
    <>
      <div className="pt-10 my-10 pl-14 flex space-x-2">
        <label htmlFor="monthSelect">From month:</label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <label htmlFor="yearSelect">From year:</label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={handleYearChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label htmlFor="monthSelect">To month:</label>
        <select
          id="monthSelect"
          value={selectedMonth2}
          onChange={handleMonthChange2}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <label htmlFor="yearSelect">To year:</label>
        <select
          id="yearSelect"
          value={selectedYear2}
          onChange={handleYearChange2}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <h1 className="mx-auto mt-14 w-[150px] text-xl font-semibold capitalize ">PLAN CHART</h1>
      <div className="mx-auto my-auto flex w-1/2 bg-slate-50">
        <div className="my-auto h-fit w-full rounded-xl  border border-gray-400 pt-0  shadow-xl">
          <canvas ref={chartRef} />
        </div>
      </div>
    </>
  )
}

export default ChartPlan