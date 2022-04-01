import { fullnames, result, results } from "..";

export default function convertData(
	signs: Array<Array<keyof typeof fullnames>>,
	full: typeof fullnames,
	res: Array<result>,
	result?: result
) {
	let data: any = results.reduce(
		// eslint-disable-next-line no-sequences
		(acc: any, curr: any) => ((acc[curr] = 0), acc),
		{}
	);
	if (!result) {
		for (let result of res) {
			data[result] += 1;
		}
	} else {
		data = {};
		for (let [i, sign] of signs.entries()) {
			for (let signal of sign) {
				if (data[signal] === undefined) {
					data[signal] = 0;
				}
				if (res[i] === result) {
					data[signal] += 1;
				}
			}
		}
	}

	data = Object.entries(data).reduce(
		(a: any, [k, v]) => (v ? ((a[k] = v), a) : a),
		{}
	);

	return {
		type: "bar",
		title:
			result === undefined
				? "Sign Results"
				: `Signal Usage in '${result}' Signs`,
		data: Object.values(data),
		label: "",
		labels: Object.keys(data),
	};
}
