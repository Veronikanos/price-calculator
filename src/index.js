const storageInput = document.querySelector('#storage');
const storage = document.querySelector('#storageValue');
const transferInput = document.querySelector('#transfer');
const transfer = document.querySelector('#transferValue');
const form = document.querySelector('form');

const bunnyRadioButtons = document.querySelectorAll('input[name="bunny"]');
const scalewayRadioButtons = document.querySelectorAll(
  'input[name="scaleway"]'
);

// storageInput.addEventListener(
//   'input',
//   () => (storage.innerText = storageInput.value)
// );
// transferInput.addEventListener(
//   'input',
//   () => (transfer.innerText = transferInput.value)
// );

form.addEventListener('input', handleInput);

function handleInput(e) {
  if (e.target.tagName !== 'INPUT') {
    return;
  }
  if (e.target.name === 'storage') {
    storage.innerText = storageInput.value;
  } else {
    transfer.innerText = transferInput.value;
  }
  let res = calculateCost(
    parseInt(storage.innerText),
    parseInt(transfer.innerText)
  );
  console.log(res);

  // console.log(parseInt(storage.innerText));
  // console.log(parseInt(transfer.innerText));

  function getBackblazePrice(storage, transfer) {
    const backblazePrice = getFactPrice(storage, transfer, 0.005, 0.01);
    return backblazePrice <= 7 ? 7 : backblazePrice;
  }

  function getBunnyPrice(storage, transfer) {
    const bunnyRadioButtons = document.querySelectorAll('input[name="bunny"]');
    let dataStorageDevice = 'hdd';
    for (let i of bunnyRadioButtons) {
      if (i.checked) {
        dataStorageDevice = i.value;
        break;
      }
    }
    const storagePrice = dataStorageDevice === 'hdd' ? 0.01 : 0.02;
    const bunnyPrice = getFactPrice(storage, transfer, storagePrice, 0.01);
    return bunnyPrice < 10 ? bunnyPrice : 10;
  }

  function calculateCost(storage, transfer) {
    const backblazeCost = getBackblazePrice(storage, transfer);
    const bunnyCost = getBunnyPrice(storage, transfer);

    const scalewayfreeStorage = storage <= 75 ? 0 : storage - 75; //if multi
    const scalewayfreeTransfer = transfer <= 75 ? 0 : transfer - 75; //if multi
    const scalewayCost = getFactPrice(
      scalewayfreeStorage,
      scalewayfreeTransfer,
      0.06,
      0.02
    );

    const vultrPrice = getFactPrice(storage, transfer, 0.01, 0.01);
    const vultrCost = vultrPrice <= 5 ? 5 : vultrPrice;

    const priceRange = [backblazeCost, bunnyCost, scalewayCost, vultrCost];
    // let minPrice = Math.min(...priceRange);
    // let color = priceRange[0] === minPrice ? 'red' : 'default';

    return priceRange;
  }

  function getFactPrice(storage, transfer, sValue, tValue) {
    return +(storage * sValue + transfer * tValue).toFixed(2);
  }
}

// const fruits = document.querySelectorAll('input[name="fruit"]')
// for (const f of fruits) {
//   if (f.checked) {
//     console.log(f.value)
//   }
// }
