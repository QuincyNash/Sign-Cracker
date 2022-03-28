import React from "react";

interface AnalyzePanelProps {
	hidden: boolean;
}

class AnalyzePanel extends React.Component<AnalyzePanelProps> {
	render() {
		return (
			<div className="w-fill h-full bg-green-400">
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

export default AnalyzePanel;
