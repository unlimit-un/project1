
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const pre_dataLineChart = ( labels ,position, title, dataset ) =>{
    const demoDatasets = [
        {
            label: 'Dataset 1',
            data: [20,30,50,60,40,80],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [10,40,50,30,20,10],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ]
    const options = {
        // responsive: true,
        plugins: {
          legend: {
            position: position,
          },
          title: {
            display: true,
            text: title,
          },
        },
      };
    const data = {
        labels,
        datasets: dataset?dataset:demoDatasets
    };

    return {data, options}
  }