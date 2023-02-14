import Chart from 'chart.js/auto';
// const popCanvas = document.getElementById('myChart');

export const config = (colors, providers, priceRange) => {
  return {
    type: 'bar',
    data: {
      labels: Object.keys(providers),
      datasets: [
        {
          label: 'Price',
          data: priceRange,
          backgroundColor: colors,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'right',
        },
        // title: {
        //   display: true,
        //   text: 'Chart.js Horizontal Bar Chart',
        // },
      },
    },
  };
};
