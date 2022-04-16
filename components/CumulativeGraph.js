import { Line } from "react-chartjs-2";

import { useTheme } from "next-themes";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const CumulativeGraph = ({ points }) => {
  const { theme, setTheme } = useTheme();
  return (
    <Line
      options={{
        responsive: true,
        scales: {
          x: {
            grid: { color: (c) => (theme === "dark" ? "#09222A" : "#BDDBE5") },
          },
          y: {
            grid: { color: (c) => (theme === "dark" ? "#09222A" : "#BDDBE5") },
          },
        },
      }}
      data={{
        labels: points.map((_, i) => i),
        datasets: [
          {
            label: 0,
            data: points,
            borderColor: points[points.length - 1] < 0 ? "#EA1601" : "#64BC26",
          },
        ],
      }}
    />
  );
};

export default CumulativeGraph;
