import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import Statictical from '../../components/Admin/Statictical';
import ChartRevenue from '../../components/Admin/ChartRevenue';
import ChartPlan from '../../components/Admin/ChartPlan';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const AdminPage = ({ user }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

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

  return (
    <AdminLayout>
      <Statictical></Statictical>

      <div className="my-5 flex space-x-2 pl-14">
        <label htmlFor="monthSelect">Month:</label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="rounded border border-gray-300 px-2 py-1"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <label htmlFor="yearSelect">Year:</label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={handleYearChange}
          className="rounded border border-gray-300 px-2 py-1"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <ChartRevenue month={selectedMonth} year={selectedYear}></ChartRevenue>
      <ChartPlan></ChartPlan>
    </AdminLayout>
  );
};

export default withPageAuthRequired(AdminPage);
