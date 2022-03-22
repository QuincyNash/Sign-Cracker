import { fullnames } from "../";

export default function convertData(
	signs: Array<Array<keyof typeof fullnames>>,
	full: typeof fullnames
) {
	let data: Array<Number> = [],
		labels: Array<string> = [];

	signs
		.filter((x) => x.length !== 0)
		.forEach((sign, i) => {
			if (sign.length > 0) {
				data.push(sign.length);
				labels.push(`Sign #${i + 1}`);
			}
		});

	return {
		type: "line",
		title: "Length of Signs",
		data,
		label: "Length",
		labels,
	};
}
