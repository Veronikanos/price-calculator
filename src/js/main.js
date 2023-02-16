import Chart from 'chart.js/auto';
import debounce from 'lodash.debounce';
import { providers } from './constants';
import { config } from './chart-config';
import { data } from './data';

const storageInput = document.querySelector('#storage');
const storage = document.querySelector('#storageValue');
const transferInput = document.querySelector('#transfer');
const transfer = document.querySelector('#transferValue');
const form = document.querySelector('form');
const popCanvas = document.getElementById('myChart');

const bunnyRadioButtons = document.querySelectorAll(
  'input[type=radio][name="bunny"]'
);
const scalewayRadioButtons = document.querySelectorAll(
  'input[type=radio][name="scaleway"]'
);

const getFactPrice = (sValue, tValue) => {
  const storageInput = parseInt(storage.innerText);
  const transferInput = parseInt(transfer.innerText);
  return +(storageInput * sValue + transferInput * tValue).toFixed(2);
};

const getBackblazePrice = () => {
  const { storage, transfer, min } = data.find(item =>
    item.name.includes('backblaze')
  );

  const backblazePrice = getFactPrice(storage, transfer);
  return backblazePrice <= min ? min : backblazePrice;
};

const getBunnyPrice = () => {
  const dataStorageDevice = document.querySelector(
    'input[name="bunny"]:checked'
  ).value;

  const { storage, transfer, max } = data.find(item =>
    item.name.includes('bunny')
  );
  const storagePrice = dataStorageDevice === 'hdd' ? storage.HDD : storage.SSD;
  const bunnyPrice = getFactPrice(storagePrice, transfer);
  return bunnyPrice < max ? bunnyPrice : max;
};

const getScalewayPrice = () => {
  let dataStorageUsers = document.querySelector(
    'input[name="scaleway"]:checked'
  ).value;

  const prices = data.find(item => item.name.includes('scaleway'));

  const storagePrice =
    dataStorageUsers === 'multi' ? prices.storage.multi : prices.storage.single;
  const scalewayfreeStorage =
    parseInt(storage.innerText) <= 75 ? 0 : parseInt(storage.innerText) - 75;
  const scalewayfreeTransfer =
    parseInt(transfer.innerText) <= 75 ? 0 : parseInt(transfer.innerText) - 75;
  return +(
    scalewayfreeStorage * storagePrice +
    scalewayfreeTransfer * prices.transfer
  ).toFixed(2);
};

const getVultrPrice = () => {
  const { storage, transfer, min } = data.find(item =>
    item.name.includes('vultr')
  );

  const vultrPrice = getFactPrice(storage, transfer);
  return vultrPrice <= min ? min : vultrPrice;
};

const calculateCost = () => {
  const backblazeCost = getBackblazePrice();
  const bunnyCost = getBunnyPrice();
  const scalewayCost = getScalewayPrice();
  const vultrCost = getVultrPrice();

  return [backblazeCost, bunnyCost, scalewayCost, vultrCost];
};

const handleChartView = (colors, providers, priceRange) => {
  // change chart view from horizontal to vertical and vice versa depends on screen width;
  const indexAxis = barChart.config.options.indexAxis || 'x';
  if (indexAxis === 'y' && window.innerWidth < 768) {
    barChart.destroy();
    const configs = config(colors, providers, priceRange, 'x');
    barChart = new Chart(popCanvas, configs);
  }
};

const countAndRenderChart = () => {
  let priceRange = calculateCost();

  let minPrice = Math.min(...priceRange);
  let index = priceRange.indexOf(minPrice);

  let colors = Object.values(providers).map((item, i) => {
    return (item = i != index ? 'grey' : item);
  });

  //create chart
  const configs = config(colors, providers, priceRange, 'y');
  barChart = new Chart(popCanvas, configs);

  //create another view of chart if wide screen width
  handleChartView(colors, providers, priceRange);
};

const handleInput = e => {
  if (barChart) barChart.destroy();
  if (e.target.tagName !== 'INPUT') {
    return;
  }

  if (e.target.name === 'storage') {
    storage.innerText = storageInput.value;
  } else if (e.target.name === 'transfer') {
    transfer.innerText = transferInput.value;
  }
  countAndRenderChart();
};

let barChart = null;
(() => {
  countAndRenderChart();
})();

// Listeners
form.addEventListener('input', debounce(handleInput, 300));

bunnyRadioButtons.forEach(radio =>
  radio.addEventListener('change', handleInput)
);

scalewayRadioButtons.forEach(radio =>
  radio.addEventListener('change', handleInput)
);
