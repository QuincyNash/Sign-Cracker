import React from "react";
import Graph from "../Graph";
import SidePanel from "../SidePanel";

interface AppState {
	sidePanelHidden: boolean;
}

class App extends React.Component {
	state: AppState;

	constructor(props: any) {
		super(props);
		this.toggleSidePanel = this.toggleSidePanel.bind(this);
		this.state = {
			sidePanelHidden: false,
		};
	}

	toggleSidePanel(_event: React.MouseEvent) {
		let newState = { ...this.state };
		newState.sidePanelHidden = !newState.sidePanelHidden;
		this.setState(newState);
	}

	render() {
		return (
			<div className="w-full h-full">
				<Graph expanded={this.state.sidePanelHidden}></Graph>
				<SidePanel
					hidden={this.state.sidePanelHidden}
					toggleHidden={this.toggleSidePanel}
				></SidePanel>
			</div>
		);
	}
}

export default App;
