import React from "react";
import ChartOptions from "./chart";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface GraphProps {
	expanded: boolean;
}

interface GraphState {
	chart?: Chart;
}

class Graph extends React.Component<GraphProps> {
	state: GraphState;

	constructor(props: any) {
		super(props);
		this.getExpandedStyles = this.getExpandedStyles.bind(this);
		this.getNotExpandedStyles = this.getNotExpandedStyles.bind(this);

		this.state = {};
	}

	getNotExpandedStyles() {
		return "w-full h-[50%] will-change-auto md:w-3/5";
	}

	getExpandedStyles() {
		return "w-full h-[calc(100%-36px)] will-change-[height] md:w-[calc(100%-36px)] md:will-change-[width]";
	}

	componentDidMount() {
		let chartElement: any = document.getElementById("chart");
		this.setState({
			chart: new Chart(chartElement.getContext("2d"), ChartOptions),
		});
	}

	render() {
		return (
			<div
				className={
					"flex justify-center items-center absolute transition-{width} duration-500 md:h-full " +
					(this.props.expanded
						? this.getExpandedStyles()
						: this.getNotExpandedStyles())
				}
			>
				<main className="w-[95%] h-[95%]">
					<div className="w-full h-full">
						<canvas id="chart"></canvas>
					</div>
				</main>
			</div>
		);
	}
}

export default Graph;
