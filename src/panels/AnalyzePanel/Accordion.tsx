import React from "react";
import AnimateHeight from "react-animate-height";
import Content from "./Content";
import { v4 as UniqueId } from "uuid";

type content = {
	text: string;
	isSelected: Function;
	onClick: React.MouseEventHandler;
};
type nestedItems = Array<string | content | nestedItems>;

interface AccordionProps {
	title: string;
	id: string;
	leftOffset?: number;
	marginTop?: number;
	items: nestedItems;
}

interface AccordionState {
	open: boolean;
}

class Accordion extends React.Component<AccordionProps> {
	state: AccordionState;

	constructor(props: any) {
		super(props);

		this.toggleOpen = this.toggleOpen.bind(this);

		let oldState = localStorage.getItem(`sign-cracker-${this.props.id}`);
		console.log(this.props.items);

		this.state = {
			...JSON.parse(oldState || '{"open": false}'),
		};
	}

	toggleOpen(_e: React.MouseEvent) {
		let newState = { ...this.state };
		newState.open = !newState.open;
		this.setState(newState);
	}

	componentWillUnmount() {
		let name = `sign-cracker-${this.props.id}`;
		localStorage.setItem(name, JSON.stringify(this.state));
	}

	render() {
		return (
			<div
				className="w-full"
				style={{
					marginLeft: `${this.props.leftOffset ?? 0}px`,
					marginTop: `${this.props.marginTop ?? 0}px`,
					width: `calc(100% - ${this.props.leftOffset ?? 0}px)`,
				}}
			>
				<div
					className={`flex items-center w-full h-10 transition-colors bg-blue-300 shadow-md ${
						typeof this.props.leftOffset === "number" ? "rounded-l-md" : ""
					} cursor-pointer dark:shadow-gray-400 dark:bg-bright-blue`}
					onClick={this.toggleOpen}
				>
					<span className="ml-2 text-lg font-roboto">{this.props.title}</span>
					<button
						className={`material-icons ml-auto mr-3 text-2xl ${
							this.state.open ? "rotate-180" : "-rotate-0"
						} transition-transform`}
					>
						expand_less
					</button>
				</div>
				<AnimateHeight
					style={{ flexShrink: 0 }}
					height={this.state.open ? "auto" : 0}
				>
					{this.props.items.map((item, i) => {
						if (Array.isArray(item)) {
							return (
								<Accordion
									title={item[0] as unknown as string}
									id={item[1] as unknown as string}
									key={i}
									leftOffset={this.props.leftOffset ?? 20}
									marginTop={2}
									items={item.slice(1)}
								></Accordion>
							);
						} else if (typeof item === "object") {
							return (
								<Content
									text={item.text}
									key={i}
									selected={item.isSelected()}
									onClick={item.onClick}
									leftOffset={this.props.leftOffset}
									marginTop={2}
								></Content>
							);
						}
						return null;
					})}
				</AnimateHeight>
			</div>
		);
	}
}

export default Accordion;
