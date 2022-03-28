import React from "react";

interface PredictPanelProps {
	hidden: boolean;
}

class PredictPanel extends React.Component<PredictPanelProps> {
	render() {
		return (
			<div className="w-fill h-full bg-purple-400">
				<p>
					Line Graph - Length
					<br></br>Bar Graph - Position Analysis
					<br></br>Bar Graph - Sign Analysis
					<br></br>Bar Graph - Symbol Analysis
				</p>
			</div>
		);
	}
}

export default PredictPanel;
