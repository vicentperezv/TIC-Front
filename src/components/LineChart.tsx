import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  data: number[];
  labels: string[];
  label: string;
  color: string;
  unit: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data, labels, label, color, unit }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y} ${unit}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: number) => `${value.toFixed(2)} ${unit}`,
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: `${color}15`,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};