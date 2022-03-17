import React from "react";
import Graph from "../Graph";
import SidePanel from "../SidePanel";
import PositionFrequency from "./graphs/PositionFrequency";

interface AppState {
	sidePanelHidden: boolean;
	fullnames: typeof fullnames;
	signs: Array<Array<keyof typeof fullnames>>;
	graphData?: any;
	graphType?: any;
	graphLabel?: any;
	graphLabels?: any;
	loader: Function;
	loaderParams: Array<any>;
}

export enum fullnames {
	RS = "Right Shoulder",
	LS = "Left Shoulder",
	RB = "Right Elbow",
	LB = "Left Elbow",
	RW = "Right Wrist",
	LW = "Left Wrist",
	N = "Nose",
	C = "Chin",
	CP = "Clap",
	H = "Hat",
	LE = "Left Ear",
	RE = "Right Ear",
	CH = "Chest",
	B = "Belt",
	LC = "Left Swipe",
	RC = "Right Swipe",
}

class App extends React.Component {
	state: AppState;
	graph: any;

	constructor(props: any) {
		super(props);

		this.toggleSidePanel = this.toggleSidePanel.bind(this);
		this.deleteSign = this.deleteSign.bind(this);

		this.state = {
			sidePanelHidden: false,
			fullnames,
			signs: [
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
				["H", "C", "RS", "LS", "B", "LE"],
			],
			loader: PositionFrequency,
			loaderParams: [],
		};
		this.state = this.load();

		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}

	load() {
		return this.loadGraph((a: any, b: any) =>
			this.state.loader(a, b, ...this.state.loaderParams)
		);
	}

	loadGraph(graphFunc: Function) {
		let graph = graphFunc(this.state.signs, this.state.fullnames);

		let newState = { ...this.state };
		newState.graphData = {
			label: graph.title,
			data: graph.data,
			backgroundColor: [
				"rgba(252, 141, 98, 0.2)",
				"rgba(102, 194, 165, 0.2)",
				"rgba(141, 160, 203, 0.2)",
				"rgba(231, 138, 195, 0.2)",
				"rgba(166, 216, 84, 0.2)",
				"rgba(255, 217, 47, 0.2)",
				"rgba(229, 196, 148, 0.2)",
				"rgba(179, 179, 179, 0.2)",
			],
			borderColor: [
				"rgba(252, 141, 98, 1)",
				"rgba(102, 194, 165, 1)",
				"rgba(141, 160, 203, 1)",
				"rgba(231, 138, 195, 1)",
				"rgba(166, 216, 84, 1)",
				"rgba(255, 217, 47, 1)",
				"rgba(229, 196, 148, 1)",
				"rgba(179, 179, 179, 1)",
			],
			borderWidth: 1,
		};
		newState.graphLabels = graph.labels;
		newState.graphLabel = graph.label;
		newState.graphType = graph.type;

		return newState;
	}

	toggleSidePanel(_event: React.MouseEvent) {
		let newState = { ...this.state };
		newState.sidePanelHidden = !newState.sidePanelHidden;
		if (newState.sidePanelHidden) {
			setTimeout(() => {
				let sidePanelElement = document.getElementById("side-panel");
				sidePanelElement?.classList.remove("transition-transform");
				sidePanelElement?.classList.add("transition-none");
			}, 500);
		} else {
			let sidePanelElement = document.getElementById("side-panel");
			sidePanelElement?.classList.remove("transition-none");
			sidePanelElement?.classList.add("transition-transform");
		}
		this.setState(newState);
	}

	deleteSign(_e: React.MouseEvent, index: number) {
		let newState = { ...this.state };
		if (window.confirm("Are you sure you want to delete this sign?")) {
			newState.signs.splice(index, 1);
			newState = this.load();
			this.setState(newState);
		}
	}

	render() {
		if (this.state.sidePanelHidden) {
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "auto";
		}

		return (
			<div className="w-full h-full bg-white dark:bg-gray-700">
				<div className="absolute ml-1 mt-1 w-6 h-6 border-gray-300 border-2 box-content rounded-md cursor-pointer z-50 transition-colors hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-600">
					<span
						className="material-icons w-full h-full dark:text-[#dcdcdc]"
						onClick={() => {
							let isDark = document.documentElement.classList.toggle("dark");

							if (isDark) {
								localStorage.setItem("theme", "dark");
							} else {
								localStorage.setItem("theme", "light");
							}

							this.forceUpdate();
						}}
					>
						{document.documentElement.classList.contains("dark")
							? "dark_mode"
							: "light_mode"}
					</span>
				</div>
				<Graph
					data={this.state.graphData}
					label={this.state.graphLabel}
					labels={this.state.graphLabels}
					type={this.state.graphType}
					signs={this.state.signs}
					fullnames={this.state.fullnames}
					expanded={this.state.sidePanelHidden}
				></Graph>
				<SidePanel
					hidden={this.state.sidePanelHidden}
					fullnames={this.state.fullnames}
					signs={this.state.signs}
					deleteSign={this.deleteSign}
					toggleHidden={this.toggleSidePanel}
				></SidePanel>
			</div>
		);
	}
}

export default App;
