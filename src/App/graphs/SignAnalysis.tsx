import { fullnames } from "..";

export default function convertData(
	signs: Array<Array<keyof typeof fullnames>>,
	full: typeof fullnames,
	position: number
) {
	console.log(signs, full, position);
	return {
		type: "bar",
		title: `Analysis of Sign #${position}`,
		data: [5, 4, 3, 2, 1],
		label: "# of Uses",
		labels: ["", "", "", "", ""],
	};
}
