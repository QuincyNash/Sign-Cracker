import React from "react";
import Graph from "../Graph";
import SidePanel from "../SidePanel";
import SignLength from "./graphs/SignLength";
import SignalAnalysis from "./graphs/SignalAnalysis";
import SignAnalysis from "./graphs/SignAnalysis";
import PositionAnalysis from "./graphs/PositionAnalysis";
import ResultAnalysis from "./graphs/ResultAnalysis";

interface AppState {
	sidePanelHidden: boolean;
	fullnames: typeof fullnames;
	signs: Array<Array<keyof typeof fullnames>>;
	results: Array<result>;
	graphData?: any;
	graphType?: any;
	graphLabel?: any;
	graphLabels?: any;
	editing?: number;
	loader: Function;
	loaderParams: Array<any>;
}

export enum fullnames {
	CP = "Clap",
	H = "Hat",
	N = "Nose",
	C = "Chin",
	CH = "Chest",
	B = "Belt",
	LE = "Left Ear",
	RE = "Right Ear",
	LS = "Left Shoulder",
	RS = "Right Shoulder",
	LB = "Left Elbow",
	RB = "Right Elbow",
	LW = "Left Wrist",
	RW = "Right Wrist",
	LC = "Left Swipe",
	RC = "Right Swipe",
}

export var results: Array<result> = [
	"Nothing",
	"Steal",
	"Bunt Left",
	"Bunt Right",
	"Double Steal",
	"Delayed Steal",
	"Slash",
	"Slash and Run",
	"Hit and Run",
	"Run and Hit",
	"Take",
	"4 Seam",
	"2 Seam",
	"Cutter",
	"Splitter",
	"Fork Ball",
	"Curve Ball",
	"Knuckle Ball",
	"Knuckle Curve",
	"Slider",
	"Sinker",
	"Slurve",
	"Screw Ball",
	"Change Up",
	"Palm Ball",
];

export type result =
	| "Nothing"
	| "Steal"
	| "Bunt Left"
	| "Bunt Right"
	| "Double Steal"
	| "Delayed Steal"
	| "Slash"
	| "Slash and Run"
	| "Hit and Run"
	| "Run and Hit"
	| "Take"
	| "4 Seam"
	| "2 Seam"
	| "Cutter"
	| "Splitter"
	| "Fork Ball"
	| "Curve Ball"
	| "Knuckle Ball"
	| "Knuckle Curve"
	| "Slider"
	| "Sinker"
	| "Slurve"
	| "Screw Ball"
	| "Change Up"
	| "Palm Ball";

class App extends React.Component {
	state: AppState;
	graph: any;

	constructor(props: any) {
		super(props);

		this.toggleSidePanel = this.toggleSidePanel.bind(this);
		this.deleteSign = this.deleteSign.bind(this);
		this.changeSign = this.changeSign.bind(this);
		this.changeResult = this.changeResult.bind(this);
		this.changeGraph = this.changeGraph.bind(this);

		let signs = localStorage.getItem("sign-cracker-signs");
		let results = localStorage.getItem("sign-cracker-results");

		let oldSelected = localStorage.getItem("sign-cracker-panel-selected");
		let graph: Function, params: any;

		if (oldSelected?.startsWith("signal")) {
			graph = SignalAnalysis;
			if (oldSelected.replace("signal ", "").includes(" ")) {
				let nums: Array<string> = oldSelected.replace("signal ", "").split(" ");
				params = [
					Object.keys(fullnames)[parseInt(nums[0])],
					parseInt(nums[1]) + 1,
				];
			} else {
				params = [
					Object.keys(fullnames)[parseInt(oldSelected.replace("signal ", ""))],
				];
			}
		} else if (oldSelected?.startsWith("sign ")) {
			graph = SignAnalysis;
			params = [parseInt(oldSelected.replace("sign ", "")) + 1];
		} else if (oldSelected === "position-final") {
			graph = PositionAnalysis;
			params = ["final"];
		} else if (oldSelected === "position-2nd-to-last") {
			graph = PositionAnalysis;
			params = ["2nd-to-last"];
		} else if (oldSelected?.startsWith("position")) {
			graph = PositionAnalysis;
			params = [parseInt(oldSelected.replace("position ", "")) + 1];
		} else if (oldSelected === "length") {
			graph = SignLength;
		} else if (oldSelected === "all-results") {
			graph = ResultAnalysis;
		} else {
			graph = PositionAnalysis;
		}

		if (params === undefined || Array.isArray(params && isNaN(params[0]))) {
			params = [];
		}

		this.state = {
			sidePanelHidden: false,
			fullnames,
			signs: JSON.parse(signs || "[]"),
			results: JSON.parse(results || "[]"),
			loader: graph,
			loaderParams: params,
		};

		this.state = this.load(this.state);

		window.onbeforeunload = () => {
			localStorage.setItem(
				"sign-cracker-signs",
				JSON.stringify(this.state.signs)
			);
			localStorage.setItem(
				"sign-cracker-results",
				JSON.stringify(this.state.results)
			);
		};

		if (
			localStorage["sign-cracker-theme"] === "dark" ||
			(!("sign-cracker-theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}

	load(currentState = this.state) {
		return this.loadGraph(
			(a: any, b: any, c: any) =>
				currentState.loader(a, b, c, ...currentState.loaderParams),
			currentState
		);
	}

	loadGraph(graphFunc: Function, currentState = this.state) {
		let graph = graphFunc(
			currentState.signs,
			currentState.fullnames,
			currentState.results
		);

		let newState = { ...currentState };
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

	changeGraph(graph: Function, params?: Array<any>) {
		let newState = { ...this.state };

		newState.loaderParams = params ?? [];
		newState.loader = graph;
		newState = this.load(newState);

		this.setState(newState);
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

	deleteSign(index: number) {
		let newState = { ...this.state };
		if (window.confirm("Are you sure you want to delete this sign?")) {
			newState.signs.splice(index, 1);
			newState.results.splice(index, 1);
			newState = this.load(newState);
			this.setState(newState);
		}
	}

	changeSign(index: number, sign: Array<keyof typeof fullnames>) {
		let newState = { ...this.state };

		if (sign.length > 0) {
			newState.signs[index] = sign;
			if (!newState.results[index]) {
				newState.results[index] = "Nothing";
			}
		} else {
			newState.signs.splice(index, 1);
			newState.results.splice(index, 1);
		}

		newState = this.load(newState);
		this.setState(newState);
	}

	changeResult(index: number, res: result) {
		let newState = { ...this.state };

		newState.results[index] = res;
		newState = this.load(newState);

		this.setState(newState);
	}

	render() {
		if (this.state.sidePanelHidden) {
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "auto";
		}

		return (
			<div className="w-full h-full bg-white dark:bg-gray-700">
				<div className="absolute z-[9999] ml-1 mt-1 w-6 h-6 border-gray-300 border-2 box-content rounded-md cursor-pointer transition-colors hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-600">
					<button
						className="material-icons w-full h-full rounded-md !outline-offset-0 dark:text-cool-white"
						onClick={() => {
							let isDark = document.documentElement.classList.toggle("dark");

							if (isDark) {
								localStorage.setItem("sign-cracker-theme", "dark");
							} else {
								localStorage.setItem("sign-cracker-theme", "light");
							}

							this.forceUpdate();
						}}
					>
						{document.documentElement.classList.contains("dark")
							? "dark_mode"
							: "light_mode"}
					</button>
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
					results={this.state.results}
					deleteSign={this.deleteSign}
					changeSign={this.changeSign}
					changeResult={this.changeResult}
					changeGraph={this.changeGraph}
					toggleHidden={this.toggleSidePanel}
				></SidePanel>
			</div>
		);
	}
}

export default App;
