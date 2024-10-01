// app/make-investment-planner/chartjs.ts

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register Chart.js components globally
ChartJS.register(ArcElement, Tooltip, Legend, Title);
