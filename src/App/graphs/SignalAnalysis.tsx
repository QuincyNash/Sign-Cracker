import { fullnames } from "..";
import converter from "number-to-words";

export default function convertData(
	signs: Array<Array<keyof typeof fullnames>>,
	full: typeof fullnames,
	results: any,
	signal: keyof typeof fullnames,
	index?: number
) {
	if (index !== undefined) {
		signs = [signs[index - 1]];
	}

	let maxSignLength = 0;
	for (let sign of signs) {
		maxSignLength = Math.max(sign.length, maxSignLength);
	}

	let data: Array<number> = Array(maxSignLength).fill(0);

	for (let sign of signs) {
		for (let [i, s] of sign.entries()) {
			if (s === signal) {
				data[i] += 1;
			}
		}
	}

	return {
		type: "bar",
		title:
			index === undefined
				? `Analysis of '${fullnames[signal]}'`
				: `Analysis of '${fullnames[signal]}' in ${converter.toOrdinal(
						index
				  )} Sign`,
		data,
		label: "Uses in Location",
		labels: data.map((_x, i) => converter.toOrdinal(i + 1)),
	};
}
