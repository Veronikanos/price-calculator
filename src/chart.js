import Chart from 'chart.js/auto';

export let barChart = new Chart(popCanvas, {
  type: 'bar',
  // type: 'horizontalBar',
  data: {
    labels: ['backblazeCost', 'bunnyCost', 'scalewayCost', 'vultrCost'],
    datasets: [
      {
        label: 'Price',
        data: res,
        backgroundColor: ['red', 'orange', 'blueviolet', 'cornflowerblue'],
      },
    ],
  },
});
