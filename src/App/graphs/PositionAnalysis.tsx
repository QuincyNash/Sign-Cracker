import { fullnames } from "..";

export default function convertData(
	signs: Array<Array<keyof typeof fullnames>>,
	full: typeof fullnames,
	position?: number | "final" | "second-to-last"
) {
	let data: Array<Number> = [];

	if (position === undefined) {
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
				if (position === "final") {
					if (sign[sign.length - 1] === signal) {
						signalCount += 1;
					}
				} else if (position === "second-to-last") {
					if (sign[sign.length - 2] === signal) {
						signalCount += 1;
					}
				} else {
					if (sign[position - 1] === signal) {
						signalCount += 1;
					}
				}
			}

			data.push(signalCount);
		}
	}

	return {
		type: "bar",
		title:
			position !== undefined
				? position === "final"
					? "Last Signal Usage"
					: `Signal Usage at Position #${position}`
				: "Signal Usage",
		data: data.filter((x) => x !== 0),
		label:
			position !== undefined ? `Count at position #${position}` : "# of Uses",
		labels: Object.keys(full).filter((_x, i) => data[i] !== 0),
	};
}
