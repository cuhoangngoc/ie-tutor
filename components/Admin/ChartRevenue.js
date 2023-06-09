import React, { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js/auto';
import axios from 'axios';

const ChartRevenue = ({ month, year }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/revenue/${month}/${year}`);
            const data = res.data;

            const chartData = data.map((order) => order.totalRevenue); // Dữ liệu biểu đồ từ API
            const chartLabel = data.map((order) => order.month + '/' + order.year); // Nhãn cho các giá trị trong biểu đồ từ API

            const chartConfig = {
                type: 'bar',
                data: {
                    labels: chartLabel,
                    datasets: [
                        {
                            label: 'Revenue',
                            data: chartData,
                            borderColor: '#004D40',
                            backgroundColor: '#00b894',
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
    }, [month, year]);

    return (
        <div>
            <h1 className="mx-auto mt-14 w-[150px] text-xl font-semibold capitalize ">CHART REVENUE</h1>
            <div className="mx-auto my-auto flex w-[1100px] bg-slate-50">
                <div className="my-auto h-fit w-full rounded-xl  border border-gray-400 pt-0  shadow-xl">
                    <canvas ref={chartRef} />
                </div>
            </div>
        </div>
    )
}

export default ChartRevenue