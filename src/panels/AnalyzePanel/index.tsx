import React from "react";
import converter from "number-to-words";
import { fullnames, result } from "../../App";
import Accordion from "./Accordion";
import Content from "./Content";
import SignLength from "../../App/graphs/SignLength";
import SignalAnalysis from "../../App/graphs/SignalAnalysis";
import SignAnalysis from "../../App/graphs/SignAnalysis";
import PositionAnalysis from "../../App/graphs/PositionAnalysis";

interface AnalyzePanelProps {
	hidden: boolean;
	signs: Array<Array<keyof typeof fullnames>>;
	results: Array<result>;
	changeGraph: (graph: Function, params?: Array<string | number>) => void;
}

interface AnalyzePanelState {
	selected?: string;
}

class AnalyzePanel extends React.Component<AnalyzePanelProps> {
	state: AnalyzePanelState;

	constructor(props: any) {
		super(props);

		this.select = this.select.bind(this);

		let oldSelected = localStorage.getItem("sign-cracker-panel-selected");
		this.state = {
			selected: oldSelected ?? "all",
		};
	}

	select(graph: string) {
		let newState = { ...this.state };
		if (newState.selected === graph) {
			newState.selected = undefined;
		} else {
			newState.selected = graph;
		}
		this.setState(newState);
	}

	componentWillUnmount() {
		let elem = document.getElementById("side-panel-content");
		if (elem) {
			localStorage.setItem(
				"sign-cracker-panel-scroll",
				elem.scrollTop.toString()
			);
		}
		localStorage.setItem(
			"sign-cracker-panel-selected",
			this.state.selected ?? ""
		);
	}

	componentDidMount() {
		let elem = document.getElementById("side-panel-content");
		let yscroll = localStorage.getItem("sign-cracker-panel-scroll");
		elem?.scroll(0, parseInt(yscroll || ""));
	}

	render() {
		let maxSignLength = 0;
		for (let sign of this.props.signs) {
			maxSignLength = Math.max(sign.length, maxSignLength);
		}

		return (
			<div className="flex flex-col items-center gap-y-0.5 w-full h-max min-h-full bg-gray-100 dark:bg-cool-white">
				<Accordion
					title="Analyze a Sign"
					items={[
						...this.props.signs.map((sign, i) => {
							return {
								text: `${converter.toWordsOrdinal(i + 1)} sign`,
								isSelected: () => this.state.selected === `sign${i}`,
								onClick: () => {
									this.select(`sign${i}`);
									this.props.changeGraph(SignAnalysis, [i + 1]);
								},
							};
						}),
					]}
				></Accordion>
				<Accordion
					title="Analyze a Specific Signal"
					items={[
						...Object.keys(fullnames).map((signal, i1) => {
							return [
								fullnames[signal as keyof typeof fullnames],
								{
									text: "all signs",
									isSelected: () => this.state.selected === `signal${i1}`,
									onClick: () => {
										this.select(`signal${i1}`);
										this.props.changeGraph(SignalAnalysis, [signal]);
									},
								},
								...this.props.signs.map((_sign, i2) => {
									return {
										text: `${converter.toWordsOrdinal(i2 + 1)} sign`,
										isSelected: () =>
											this.state.selected === `signal${i1}${i2}`,
										onClick: () => {
											this.select(`signal${i1}${i2}`);
											this.props.changeGraph(SignalAnalysis, [signal, i2 + 1]);
										},
									};
								}),
							];
						}),
					]}
				></Accordion>
				<Accordion
					title="Analyze a Position"
					items={[
						{
							text: "last signal",
							isSelected: () => this.state.selected === `position-final`,
							onClick: () => {
								this.select(`position-final`);
								this.props.changeGraph(PositionAnalysis, ["final"]);
							},
						},
						{
							text: "2nd to last signal",
							isSelected: () => this.state.selected === `position-2nd-to-last`,
							onClick: () => {
								this.select(`position-2nd-to-last`);
								this.props.changeGraph(PositionAnalysis, ["second-to-last"]);
							},
						},
						...new Array(maxSignLength).fill(null).map((_v, i) => {
							return {
								text: `${converter.toWordsOrdinal(i + 1)} signal`,
								isSelected: () => this.state.selected === `position${i}`,
								onClick: () => {
									this.select(`position${i}`);
									this.props.changeGraph(PositionAnalysis, [i + 1]);
								},
							};
						}),
					]}
				></Accordion>
				<Content
					text="length of signs"
					selected={this.state.selected === "length"}
					onClick={() => {
						this.select("length");
						this.props.changeGraph(SignLength);
					}}
					leftOffset={0}
				></Content>
				<Content
					text="all signals"
					selected={this.state.selected === "all"}
					onClick={() => {
						this.select("all");
						this.props.changeGraph(PositionAnalysis);
					}}
					leftOffset={0}
				></Content>
			</div>
		);
	}
}

export default AnalyzePanel;
