import { fullnames } from "..";

export default function convertData(
	signs: Array<Array<keyof typeof fullnames>>,
	full: typeof fullnames,
	position?: number
) {
	let data: Array<Number> = [];

	if (!position) {
		for (let signal of Object.keys(full)) {
			let signalCount = 0;

			for (let sign of signs) {
				signalCount += sign.filter((s) => s === signal).length;
			}

			data.push(signalCount);
		}
	} else {
		for (let signal of Object.keys(full)) {
			let signalCount = 0;

			for (let sign of signs) {
				if (sign[position - 1] === signal) {
					signalCount += 1;
				}
			}

			data.push(signalCount);
		}
	}

	return {
		type: "bar",
		title:
			position !== undefined
				? `Signal Usage at Position #${position}`
				: "Signal Usage",
		data: data.filter((x) => x !== 0),
		label:
			position !== undefined ? `Count at position #${position}` : "# of Uses",
		labels: Object.keys(full).filter((_x, i) => data[i] !== 0),
	};
}
