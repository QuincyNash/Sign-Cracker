import React from "react";
import { result, fullnames } from "../App";
import AnalyzePanel from "../panels/AnalyzePanel";
import PredictPanel from "../panels/PredictPanel";
import SignsPanel from "../panels/SignsPanel";

interface SidePanelState {
	panel: "Analyze" | "Signs" | "Predict";
}

interface SidePanelProps {
	hidden: boolean;
	fullnames: typeof fullnames;
	signs: Array<Array<keyof typeof fullnames>>;
	results: Array<result>;
	deleteSign: (index: number) => void;
	changeSign: (index: number, sign: Array<keyof typeof fullnames>) => void;
	changeGraph: (graph: Function, params?: Array<string | number>) => void;
	toggleHidden: React.MouseEventHandler;
}

class SidePanel extends React.Component<SidePanelProps> {
	state: SidePanelState;

	constructor(props: any) {
		super(props);

		this.switchPanel = this.switchPanel.bind(this);
		this.getPanel = this.getPanel.bind(this);
		this.getHiddenStyles = this.getHiddenStyles.bind(this);
		this.getSelectedPanelStyles = this.getSelectedPanelStyles.bind(this);
		this.getNotSelectedPanelStyles = this.getNotSelectedPanelStyles.bind(this);

		this.state = {
			panel: "Analyze",
		};
	}

	componentDidMount() {
		window.addEventListener("resize", () => {
			let iconElement = document.getElementById("hide-icon");
			let iconType = iconElement?.textContent;
			if (iconType !== this.getIconType()) {
				this.forceUpdate();
			}
		});
	}

	getIconType() {
		if (window.innerWidth < 768) {
			let iconType = "keyboard_double_arrow_down";
			if (this.props.hidden) {
				iconType = "keyboard_double_arrow_up";
			}
			return iconType;
		}
		let iconType = "keyboard_double_arrow_right";
		if (this.props.hidden) {
			iconType = "keyboard_double_arrow_left";
		}
		return iconType;
	}

	switchPanel(panel: any) {
		let newState = { ...this.state };
		newState.panel = panel;
		this.setState(newState);
	}

	getPanel() {
		if (this.state.panel === "Analyze") {
			return (
				<AnalyzePanel
					changeGraph={this.props.changeGraph}
					signs={this.props.signs}
					results={this.props.results}
					hidden={this.props.hidden}
				></AnalyzePanel>
			);
		} else if (this.state.panel === "Signs") {
			return (
				<SignsPanel
					hidden={this.props.hidden}
					deleteSign={this.props.deleteSign}
					changeSign={this.props.changeSign}
					signs={this.props.signs}
					results={this.props.results}
				></SignsPanel>
			);
		} else if (this.state.panel === "Predict") {
			return <PredictPanel hidden={this.props.hidden}></PredictPanel>;
		}
	}

	getHiddenStyles() {
		return "translate-y-[calc(100%-36px)] md:translate-x-[calc(100%-36px)] md:translate-y-0";
	}

	getSelectedPanelStyles() {
		return "bg-gray-600 text-white dark:bg-gray-300 dark:text-gray-600";
	}

	getNotSelectedPanelStyles() {
		return "bg-gray-300 text-black hover:bg-gray-400 dark:bg-gray-700 dark:text-cool-white dark:hover:bg-gray-600";
	}

	render() {
		return (
			<div
				id="side-panel"
				className={
					"flex flex-col w-full h-[50%] absolute left-0 top-[50%] transition-transform duration-500 md:top-0 md:h-full md:left-1/2 md:w-1/2 md:flex-row " +
					(this.props.hidden ? this.getHiddenStyles() : "")
				}
			>
				<button
					className="flip-tab w-9 h-9 grow rounded-t md:rounded-none md:rounded-l cursor-pointer bg-gray-100 transition-colors hover:bg-gray-200  dark:bg-gray-400 dark:hover:bg-gray-300"
					onClick={this.props.toggleHidden}
				>
					<span
						id="hide-icon"
						className="material-icons w-full h-full text-4xl"
					>
						{this.getIconType()}
					</span>
				</button>
				<main className="flex flex-col w-full h-[calc(100%-2.25rem)] md:h-full">
					<nav>
						{["Analyze", "Signs", "Predict"].map((panel: string, i) => {
							return (
								<button
									className={
										"flip-tab inline-block w-1/3 p-1 text-lg cursor-pointer text-center font-serif transition-colors sm:text-xl md:text-2xl md:p-0 xl:text-3xl " +
										(this.state.panel === panel
											? this.getSelectedPanelStyles()
											: this.getNotSelectedPanelStyles())
									}
									key={i}
									tabIndex={this.props.hidden ? -1 : 0}
									onClick={() => this.switchPanel(panel)}
								>
									{panel}
								</button>
							);
						})}
					</nav>
					<div id="side-panel-content" className="w-full grow overflow-auto">
						{this.getPanel()}
					</div>
				</main>
			</div>
		);
	}
}

export default SidePanel;
