import React from "react";

interface ContentProps {
	text: string;
	selected: boolean;
	onClick: React.MouseEventHandler;
	leftOffset?: number;
	marginTop?: number;
}

class Content extends React.Component<ContentProps> {
	render() {
		return (
			<button
				className={`h-8 rounded-l-md bg-gray-300 transition-colors ${
					this.props.selected
						? "bg-green-400 dark:bg-green-600"
						: "dark:bg-gray-500 dark:hover:bg-gray-600"
				}`}
				onClick={this.props.onClick}
				style={{
					width: `calc(100% - ${this.props.leftOffset ?? 20}px)`,
					marginTop: `${this.props.marginTop ?? 0}px`,
					marginLeft: `${this.props.leftOffset ?? 20}px`,
				}}
			>
				<p className="capitalize w-fit py-1 ml-2 text-black dark:text-cool-white text-base font-roboto">
					{this.props.text}
				</p>
			</button>
		);
	}
}

export default Content;
