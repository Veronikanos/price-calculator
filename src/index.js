const storageInput = document.querySelector('#storage');
const storage = document.querySelector('#storageValue');
const transferInput = document.querySelector('#transfer');
const transfer = document.querySelector('#transferValue');

const handleRangeInput = () => {
  storage.innerText = storageInput.value;
};

const handleTransferInput = () => {
  transfer.innerText = transferInput.value;
};

storageInput.addEventListener('input', handleRangeInput);
transferInput.addEventListener('input', handleTransferInput);
