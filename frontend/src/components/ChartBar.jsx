import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { ThemeContext } from '../context/ThemeContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBar = ({ data, title }) => {
  const { theme } = useContext(ThemeContext);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: !!title,
        text: title,
        color: theme === 'dark' ? '#e8eaf0' : '#1a1d2e',
        font: { family: 'Syne', size: 16, weight: '700' }
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#1a1e28' : '#ffffff',
        titleColor: theme === 'dark' ? '#e8eaf0' : '#1a1d2e',
        bodyColor: theme === 'dark' ? '#b0b3c1' : '#3d4160',
        borderColor: 'var(--border-default)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        },
        ticks: {
          color: theme === 'dark' ? '#7a7f94' : '#8487a0',
          font: { family: 'DM Sans' }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'dark' ? '#7a7f94' : '#8487a0',
          font: { family: 'DM Sans' }
        }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartBar;
