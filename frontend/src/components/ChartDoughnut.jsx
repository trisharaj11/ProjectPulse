import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ThemeContext } from '../context/ThemeContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDoughnut = ({ data }) => {
  const { theme } = useContext(ThemeContext);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: theme === 'dark' ? '#b0b3c1' : '#3d4160',
          font: { family: 'DM Sans', size: 11 },
          padding: 20,
          usePointStyle: true,
        }
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
    cutout: '70%',
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ChartDoughnut;
