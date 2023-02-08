const storageInput = document.querySelector('#storage');
const storage = document.querySelector('#storageValue');
const transferInput = document.querySelector('#transfer');
const transfer = document.querySelector('#transferValue');
const form = document.querySelector('form');

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

  function calculateCost(storage, transfer) {
    const backblazePrice = getFactPrice(storage, transfer, 0.005, 0.01);
    const backblazeCost = backblazePrice <= 7 ? 7 : backblazePrice;

    const bunnyPrice = getFactPrice(storage, transfer, 0.01, 0.01); //if hhd
    const bunnyCost = bunnyPrice < 10 ? bunnyPrice : 10;

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
