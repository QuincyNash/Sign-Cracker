import React from "react";
import Graph from "../Graph";
import SidePanel from "../SidePanel";

interface AppState {
	sidePanelHidden: boolean;
	signs: Array<Array<string>>;
}

class App extends React.Component {
	state: AppState;

	constructor(props: any) {
		super(props);
		this.toggleSidePanel = this.toggleSidePanel.bind(this);
		this.state = {
			sidePanelHidden: false,
			signs: [["A", "B", "C"]],
		};
	}

	toggleSidePanel(_event: React.MouseEvent) {
		let newState = { ...this.state };
		newState.sidePanelHidden = !newState.sidePanelHidden;
		if (newState.sidePanelHidden) {
			setTimeout(() => {
				console.log("NO TRANSITION");
				let sidePanelElement = document.getElementById("side-panel");
				sidePanelElement?.classList.remove("transition-transform");
				sidePanelElement?.classList.add("transition-none");
			}, 500);
		} else {
			console.log("TRANSITION");
			let sidePanelElement = document.getElementById("side-panel");
			sidePanelElement?.classList.remove("transition-none");
			sidePanelElement?.classList.add("transition-transform");
		}
		this.setState(newState);
	}

	render() {
		if (this.state.sidePanelHidden) {
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "auto";
		}

		return (
			<div className="w-full h-full">
				<Graph expanded={this.state.sidePanelHidden}></Graph>
				<SidePanel
					hidden={this.state.sidePanelHidden}
					signs={this.state.signs}
					toggleHidden={this.toggleSidePanel}
				></SidePanel>
			</div>
		);
	}
}

export default App;
