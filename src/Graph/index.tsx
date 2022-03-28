import React from "react";
import { fullnames } from "../App";
import getChartOptions from "./chart";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface GraphProps {
	expanded: boolean;
	data: any;
	label: string;
	labels: any;
	type: any;
	signs: Array<Array<keyof typeof fullnames>>;
	fullnames: typeof fullnames;
}

class Graph extends React.Component<GraphProps> {
	chart?: Chart;
	expanded: boolean;

	constructor(props: any) {
		super(props);

		this.getExpandedStyles = this.getExpandedStyles.bind(this);
		this.getNotExpandedStyles = this.getNotExpandedStyles.bind(this);
		this.expanded = false;
	}

	getNotExpandedStyles() {
		return "w-full h-[50%] will-change-auto md:w-1/2";
	}

	getExpandedStyles() {
		return "w-full h-[calc(100%-36px)] will-change-[height] md:w-[calc(100%-36px)] md:will-change-[width]";
	}

	componentDidMount() {
		this.chart = this.recreateChart();
	}

	componentDidUpdate() {
		this.chart = this.recreateChart();
	}

	recreateChart() {
		this.chart?.destroy();

		let chartElement: any = document.getElementById("chart");

		return new Chart(chartElement.getContext("2d"), {
			type: this.props.type,
			data: {
				labels: this.props.labels,
				datasets: [this.props.data],
			},
			options: getChartOptions(this.props.label, this.props.type),
		});
	}

	render() {
		return (
			<div
				id="graph"
				className={
					"flex justify-center items-center absolute select-none transition-{width} duration-500 md:h-full " +
					(this.props.expanded
						? this.getExpandedStyles()
						: this.getNotExpandedStyles())
				}
			>
				<main className="w-[90%] h-[90%]">
					<div id="chart-wrapper" className="w-full h-full">
						<canvas id="chart"></canvas>
					</div>
				</main>
			</div>
		);
	}
}

export default Graph;
