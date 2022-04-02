import { fullnames, result } from "..";
import converter from "number-to-words";

export default function convertData(
	signs: Array<Array<keyof typeof fullnames>>,
	full: typeof fullnames,
	results: any,
	signal: keyof typeof fullnames,
	index?: number | "result",
	result?: result
) {
	if (typeof index === "number") {
		signs = [signs[index - 1]];
	}

	let maxSignLength = 0;
	for (let sign of signs) {
		maxSignLength = Math.max(sign.length, maxSignLength);
	}

	let data: Array<number> = Array(maxSignLength).fill(0);

	for (let [index, sign] of signs.entries()) {
		if (result === undefined || results[index] === result) {
			for (let [i, s] of sign.entries()) {
				if (s === signal) {
					data[i] += 1;
				}
			}
		}
	}

	console.log(data);

	return {
		type: "bar",
		title:
			result === undefined
				? index === undefined
					? `Analysis of '${fullnames[signal]}'`
					: `Analysis of '${fullnames[signal]}' in ${converter.toOrdinal(
							index
					  )} Sign`
				: `Analysis of '${fullnames[signal]} in '${result}' Signs`,
		data,
		label: "Uses in Location",
		labels: data.map((_x, i) => converter.toOrdinal(i + 1)),
	};
}
