import { fullnames } from "..";

export default function convertData(
	signs: Array<Array<keyof typeof fullnames>>,
	full: typeof fullnames,
	results: any,
	position: number
) {
	let names = Object.keys(fullnames);
	let data: Array<number> = Array(names.length).fill(0);

	for (let signal of signs[position - 1]) {
		data[names.indexOf(signal)] += 1;
	}

	return {
		type: "bar",
		title:
			position !== undefined
				? `Signal Usage at Position #${position}`
				: "Signal Usage",
		data: data.filter((x) => x !== 0),
		label: "# of Uses",
		labels: names.filter((_x, i) => data[i] !== 0),
	};
}
