import React from "react";

interface SignsPanelProps {
	signs: Array<Array<string>>;
}

class SignsPanel extends React.Component<SignsPanelProps> {
	render() {
		return (
			<div className="w-fill h-full bg-blue-400">
				<ol>
					{this.props.signs.map((sign, _i) => {
						return <li>{sign.join()}</li>;
					})}
				</ol>
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

export default SignsPanel;
