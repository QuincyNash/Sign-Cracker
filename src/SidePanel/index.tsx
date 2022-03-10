import React from "react";
import AnalyzePanel from "../panels/AnalyzePanel";
import PredictPanel from "../panels/PredictPanel";
import SignsPanel from "../panels/SignsPanel";

interface SidePanelState {
	panel: "Analyze" | "Signs" | "Predict";
}

interface SidePanelProps {
	hidden: boolean;
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

	getIconType() {
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
			return <AnalyzePanel></AnalyzePanel>;
		} else if (this.state.panel === "Signs") {
			return <SignsPanel></SignsPanel>;
		} else if (this.state.panel === "Predict") {
			return <PredictPanel></PredictPanel>;
		}
	}

	getHiddenStyles() {
		return "translate-x-[calc(100%-36px)]";
	}

	getSelectedPanelStyles() {
		return "bg-gray-600 text-white";
	}

	getNotSelectedPanelStyles() {
		return "bg-gray-300 text-black hover:bg-gray-400";
	}

	render() {
		return (
			<div
				className={
					"flex w-2/5 h-full absolute float-right left-[60%] transition-transform duration-500 " +
					(this.props.hidden ? this.getHiddenStyles() : "")
				}
			>
				<div
					className="w-9 h-9 rounded-l cursor-pointer bg-gray-100 transition-colors hover:bg-gray-200"
					onClick={this.props.toggleHidden}
				>
					<span className={"material-icons w-full h-full select-none text-4xl"}>
						{this.getIconType()}
					</span>
				</div>
				<main className="flex flex-col h-full grow">
					<nav>
						{["Analyze", "Signs", "Predict"].map((panel: string, _i) => {
							return (
								<span
									className={
										"inline-block w-1/3 text-sm p-1 select-none cursor-pointer text-center font-serif transition-colors sm:text-base sm:p-0.5 md:text-lg md:p-0 lg:text-2xl xl:text-3xl " +
										(this.state.panel === panel
											? this.getSelectedPanelStyles()
											: this.getNotSelectedPanelStyles())
									}
									key={panel}
									onClick={() => this.switchPanel(panel)}
								>
									{panel}
								</span>
							);
						})}
					</nav>
					<main className="w-full grow">{this.getPanel()}</main>
				</main>
			</div>
		);
	}
}

export default SidePanel;
