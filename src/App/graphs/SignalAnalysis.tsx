import { fullnames } from "..";

export default function convertData(
	signs: Array<Array<keyof typeof fullnames>>,
	full: typeof fullnames,
	signal: keyof typeof fullnames
) {
	return {
		type: "bar",
		title: `Analysis of Signal #${fullnames[signal]}`,
		data: [5, 4, 3, 2, 1],
		label: "Uses in Location",
		labels: ["Position #1", "", "", "", ""],
	};
}
