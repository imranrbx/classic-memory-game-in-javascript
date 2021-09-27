const boxes = document.querySelectorAll(".box");
let compare = [];
let indexes = [];
let time = 0;
let count = 0;
let interval = null;
let timeout = null;
function init() {
	const randNums = shuffle([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]);
	boxes.forEach((box, index) => {
		box.innerHTML = `<img src="./images/${randNums[index]}.png" />`;
		setTimeout(() => {
			box.innerHTML = "";
		}, 2000);
		box.addEventListener("click", (el) => {
			el.target.innerHTML = `<img src="./images/${randNums[index]}.png" />`;
			compare.push(randNums[index]);
			indexes.push(index);
			if (compare.length === 2) {
				if (compare[0] === compare[1] && indexes[0] !== indexes[1]) {
					count += 1;
					indexes.forEach((item) =>
						boxes[item].setAttribute("disabled", "disabled")
					);
				} else {
					indexes.forEach((item) => (boxes[item].innerHTML = ""));
				}
				compare = [];
				indexes = [];
			}
			if (count === 6) {
				boxes.forEach((box) =>
					box.setAttribute("disabled", "disabled")
				);
				clearInterval(interval);
				clearTimeout(timeout);
			}
		});
	});
}
timeout = setTimeout(() => {
	interval = setInterval(() => {
		time += 1;
		document.querySelector("#score span").innerText = time;
	}, 1000);
}, 1000);
function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
}
init();

document
	.getElementById("reset")
	.addEventListener("click", () => location.reload());
