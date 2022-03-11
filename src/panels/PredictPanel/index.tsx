import React from "react";

class PredictPanel extends React.Component {
	render() {
		return (
			<div className="w-fill h-full bg-purple-400">
				<p>
					Pie Graph - Sign Symbol Frequency
					<br></br>Bar Graph - Number of Times a Symbol is in Different
					Positions (for every symbol)
					<br></br>Line Graph - Length of Signs over Time
				</p>
			</div>
		);
	}
}

export default PredictPanel;
