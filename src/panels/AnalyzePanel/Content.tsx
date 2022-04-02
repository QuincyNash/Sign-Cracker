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
				className={`group h-8 rounded-l-md transition-colors ${
					this.props.selected
						? "bg-emerald-400 hover:bg-emerald-300 dark:bg-emerald-500 dark:hover:bg-emerald-600"
						: "bg-gray-300 hover:bg-gray-200 dark:bg-gray-400 dark:hover:bg-gray-600"
				}`}
				onClick={this.props.onClick}
				style={{
					width: `calc(100% - ${this.props.leftOffset ?? 20}px)`,
					marginTop: `${this.props.marginTop ?? 0}px`,
					marginLeft: `${this.props.leftOffset ?? 20}px`,
				}}
			>
				<p className="capitalize w-fit py-1 ml-2 transition-colors text-black text-base font-roboto dark:group-hover:text-cool-white">
					{this.props.text}
				</p>
			</button>
		);
	}
}

export default Content;
