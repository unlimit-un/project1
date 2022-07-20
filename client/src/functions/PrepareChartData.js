
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement} from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  export const pre_dataLineChart = ( labels ,position, title, dataset ) =>{
    const demoDatasets = [
        {
            label: 'Dataset 1',
            data: [20,30,50,60,40,80],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            // tension:0.4,
            // fill: true
        },
        {
            label: 'Dataset 2',
            data: [10,40,50,30,20,10],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // tension:0.4,
            // fill: true
        },
    ]
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: position,
          },
          title: {
            display: true,
            text: title,
          },
          filler: {
            propagate: true
          }
        },
        maintainAspectRatio: false
      };
    const data = {
        labels,
        datasets: dataset?dataset:demoDatasets
    };

    return {data, options}
  }

export const pre_dataBarChart = ( labels ,position, title, dataset ) =>{
  const demoDatasets = [
      {
          label: 'Dataset 1',
          data: [20,30,50,60,40,80],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // tension:0.4,
          // fill: true
      },
      {
          label: 'Dataset 2',
          data: [10,40,50,30,20,10],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          // tension:0.4,
          // fill: true
      },
  ]
  const options = {
      responsive: true,
      plugins: {
        legend: {
          position: position,
        },
        title: {
          display: true,
          text: title,
        },
        filler: {
          propagate: true
        }
      },
      maintainAspectRatio: false
    };
  const data = {
      labels,
      datasets: dataset?dataset:demoDatasets
  };

  return {data, options}
}

export const pre_dataPieChart = ( labels ,position, title, dataset ) =>{
  const demoDatasets = [
      {
          // label: 'Dataset 1',
          data: [20,30],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
      }
  ]
  const options = {
      // responsive: true,
      plugins: {
        legend: {
          position: position,
        },
        title: {
          display: title?true:false,
          text: title,
        }
      },
      maintainAspectRatio: false
    };
  const data = {
      labels,
      datasets: dataset?dataset:demoDatasets
  };

  return {data, options}
}