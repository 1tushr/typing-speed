import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {useTheme} from '../Context/ThemeContext'
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Graph({ graphData }) {
    const {theme}=useTheme();
  const data = {
    labels: graphData.map(i => i[0]),
    datasets: [
      {
        data: graphData.map(i => i[1]), // Corrected mapping to i[1]
        label: 'wpm',
        borderColor: theme.textColor,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
}
