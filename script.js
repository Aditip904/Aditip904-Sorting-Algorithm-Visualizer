const arrayContainer = document.getElementById("array-container");
const generateBtn = document.getElementById("generate");
const sortBtn = document.getElementById("sort");
const algorithmSelect = document.getElementById("algorithm");
const arraySizeInput = document.getElementById("arraySize");

let array = [];

// Generate a new random array and display it.
function generateArray(size) {
  array = [];
  arrayContainer.innerHTML = "";
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 300) + 10;
    array.push(value);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    bar.style.width = `${600 / size}px`;
    arrayContainer.appendChild(bar);
  }
}

// Sleep function to introduce delay.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Swap function for sorting.
async function swap(bars, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
  bars[i].style.height = `${array[i]}px`;
  bars[j].style.height = `${array[j]}px`;
}

// Insertion Sort
async function insertionSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j - 1] > array[j]) {
      await swap(bars, j, j - 1);
      j--;
      await sleep(50);
    }
  }
}

// Merge Sort
async function mergeSort(arr = array, start = 0, end = array.length) {
  if (end - start <= 1) return;

  const mid = Math.floor((start + end) / 2);
  await mergeSort(arr, start, mid);
  await mergeSort(arr, mid, end);
  await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end) {
  let merged = [];
  let i = start, j = mid;

  while (i < mid && j < end) {
    if (arr[i] < arr[j]) merged.push(arr[i++]);
    else merged.push(arr[j++]);
  }

  while (i < mid) merged.push(arr[i++]);
  while (j < end) merged.push(arr[j++]);

  for (let k = start; k < end; k++) {
    arr[k] = merged[k - start];
    document.querySelectorAll(".bar")[k].style.height = `${arr[k]}px`;
    await sleep(50);
  }
}

// Quick Sort
async function quickSort(arr = array, left = 0, right = array.length - 1) {
  if (left >= right) return;

  const pivotIndex = await partition(arr, left, right);
  await quickSort(arr, left, pivotIndex - 1);
  await quickSort(arr, pivotIndex + 1, right);
}

async function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      await swap(document.querySelectorAll(".bar"), i, j);
      i++;
    }
  }
  await swap(document.querySelectorAll(".bar"), i, right);
  return i;
}

// Event Listeners
generateBtn.addEventListener("click", () => generateArray(arraySizeInput.value));
sortBtn.addEventListener("click", async () => {
  const algorithm = algorithmSelect.value;
  if (algorithm === "bubble") await bubbleSort();
  else if (algorithm === "selection") await selectionSort();
  else if (algorithm === "insertion") await insertionSort();
  else if (algorithm === "merge") await mergeSort();
  else if (algorithm === "quick") await quickSort();
});

// Initialize with default array size.
generateArray(arraySizeInput.value);
