import React from "react";

interface GraphProps {
	expanded: boolean;
}

class Graph extends React.Component<GraphProps> {
	constructor(props: any) {
		super(props);
		this.getExpandedStyles = this.getExpandedStyles.bind(this);
		this.getNotExpandedStyles = this.getNotExpandedStyles.bind(this);
	}

	getNotExpandedStyles() {
		return "w-3/5 will-change-auto";
	}

	getExpandedStyles() {
		return "w-[calc(100%-36px)] will-change-[width]";
	}

	render() {
		return (
			<div
				className={
					"flex h-full justify-center items-center absolute transition-{width} duration-500 " +
					(this.props.expanded
						? this.getExpandedStyles()
						: this.getNotExpandedStyles())
				}
			>
				<main className="w-4/5 h-3/5 bg-red-400">
					<p>
						Pie Graph - Sign Symbol Frequency
						<br></br>Bar Graph - Number of Times a Symbol is in Different
						Positions (for every symbol)
						<br></br>Line Graph - Length of Signs over Time
					</p>
				</main>
			</div>
		);
	}
}

export default Graph;
