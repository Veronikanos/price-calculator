const storageInput = document.querySelector('#storage');
const storage = document.querySelector('#storageValue');
const transferInput = document.querySelector('#transfer');
const transfer = document.querySelector('#transferValue');
const form = document.querySelector('form');

const bunnyRadioButtons = document.querySelectorAll(
  'input[type=radio][name="bunny"]'
);
const scalewayRadioButtons = document.querySelectorAll(
  'input[type=radio][name="scaleway"]'
);

console.log(bunnyRadioButtons);

const getFactPrice = (storage, transfer, sValue, tValue) => {
  return +(storage * sValue + transfer * tValue).toFixed(2);
};

const getBackblazePrice = (storage, transfer) => {
  const backblazePrice = getFactPrice(storage, transfer, 0.005, 0.01);
  return backblazePrice <= 7 ? 7 : backblazePrice;
};

const getBunnyPrice = (storage, transfer) => {
  let dataStorageDevice = document.querySelector(
    'input[name="bunny"]:checked'
  ).value;
  const storagePrice = dataStorageDevice === 'hdd' ? 0.01 : 0.02;
  const bunnyPrice = getFactPrice(storage, transfer, storagePrice, 0.01);
  return bunnyPrice < 10 ? bunnyPrice : 10;
};

const getScalewayPrice = (storage, transfer) => {
  let dataStorageUsers = document.querySelector(
    'input[name="scaleway"]:checked'
  ).value;
  const storagePrice = dataStorageUsers === 'multi' ? 0.06 : 0.03;
  const scalewayfreeStorage = storage <= 75 ? 0 : storage - 75;
  const scalewayfreeTransfer = transfer <= 75 ? 0 : transfer - 75;
  return getFactPrice(
    scalewayfreeStorage,
    scalewayfreeTransfer,
    storagePrice,
    0.02
  );
};

const getVultrPrice = (storage, transfer) => {
  const vultrPrice = getFactPrice(storage, transfer, 0.01, 0.01);
  return vultrPrice <= 5 ? 5 : vultrPrice;
};

const calculateCost = (storage, transfer) => {
  const backblazeCost = getBackblazePrice(storage, transfer);
  const bunnyCost = getBunnyPrice(storage, transfer);
  const scalewayCost = getScalewayPrice(storage, transfer);
  const vultrCost = getVultrPrice(storage, transfer);

  const priceRange = [backblazeCost, bunnyCost, scalewayCost, vultrCost];
  // let minPrice = Math.min(...priceRange);
  // let color = priceRange[0] === minPrice ? 'red' : 'default';

  return priceRange;
};

const handleInput = e => {
  if (e.target.tagName !== 'INPUT') {
    return;
  }
  if (e.target.name === 'storage') {
    storage.innerText = storageInput.value;
  } else if (e.target.name === 'transfer') {
    transfer.innerText = transferInput.value;
  }
  let res = calculateCost(
    parseInt(storage.innerText),
    parseInt(transfer.innerText)
  );
  console.log(res);
};

// Listeners

form.addEventListener('input', handleInput);

bunnyRadioButtons.forEach(radio =>
  radio.addEventListener('change', handleInput)
);

scalewayRadioButtons.forEach(radio =>
  radio.addEventListener('change', handleInput)
);
