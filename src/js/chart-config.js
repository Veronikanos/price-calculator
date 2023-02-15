export const config = (colors, providers, priceRange, axis) => {
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
      indexAxis: `${axis}`,
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          position: 'right',
        },
      },
    },
  };
};
