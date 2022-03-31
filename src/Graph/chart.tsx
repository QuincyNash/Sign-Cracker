import { Chart, ChartOptions } from "chart.js";
import { fullnames } from "../App";

function getChartOptions(chartLabel: string, chartType: string) {
	let isDark = document.documentElement.classList.contains("dark");
	let color = isDark ? "#dcdcdc" : "#666";
	let borderColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

	Chart.defaults.elements.point.hitRadius = 12;
	Chart.defaults.elements.point.radius = 4;
	Chart.defaults.elements.point.hoverRadius = 6;

	const options: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				ticks: {
					color,
				},
				grid: {
					color: borderColor,
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1,
					color,
				},
				grid: {
					color: borderColor,
				},
			},
		},
		plugins: {
			legend: {
				onClick: () => {},
				labels: {
					color,
				},
			},
			tooltip: {
				callbacks: {
					title: (data) => {
						let label: any = data[0].label;

						if (Object.keys(fullnames).includes(label)) {
							return Object.entries(fullnames)[
								Object.keys(fullnames).indexOf(label)
							][1];
						} else {
							return label;
						}
					},
					label: (data) => {
						return `${chartLabel}: ${data.formattedValue}`;
					},
				},
			},
		},
	};

	return options;
}

export default getChartOptions;
