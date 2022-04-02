import React from "react";
import converter from "number-to-words";
import {
	fullnames,
	result,
	results,
	pitchingResults,
	hittingResults,
} from "../../App";
import Accordion from "./Accordion";
import Content from "./Content";
import SignLength from "../../App/graphs/SignLength";
import SignalAnalysis from "../../App/graphs/SignalAnalysis";
import SignAnalysis from "../../App/graphs/SignAnalysis";
import PositionAnalysis from "../../App/graphs/PositionAnalysis";
import ResultAnalysis from "../../App/graphs/ResultAnalysis";

interface AnalyzePanelProps {
	hidden: boolean;
	signs: Array<Array<keyof typeof fullnames>>;
	results: Array<result>;
	changeGraph: (graph: Function, params?: Array<any>) => void;
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
			selected: oldSelected ?? "all-results",
		};
	}

	select(graph: string) {
		let newState = { ...this.state };
		newState.selected = graph;
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
			<div className="flex flex-col items-center gap-y-0.5 w-full h-max min-h-full bg-gray-100 dark:bg-gray-300">
				<Accordion
					title="Analyze a Sign"
					id="analyze-sign"
					items={[
						...this.props.signs.map((sign, i) => {
							return {
								text: `${converter.toWordsOrdinal(i + 1)} sign`,
								isSelected: () => this.state.selected === `sign ${i}`,
								onClick: () => {
									this.select(`sign ${i}`);
									this.props.changeGraph(SignAnalysis, [i + 1]);
								},
							};
						}),
					]}
				></Accordion>
				<Accordion
					title="Analyze a Specific Signal"
					id="analyze-specific-symbol"
					items={[
						...Object.keys(fullnames).map((signal, i1) => {
							return [
								fullnames[signal as keyof typeof fullnames],
								`${fullnames[
									signal as keyof typeof fullnames
								].toLowerCase()}-${i1}`,
								{
									text: "all signs",
									isSelected: () => this.state.selected === `signal ${i1}`,
									onClick: () => {
										this.select(`signal ${i1}`);
										this.props.changeGraph(SignalAnalysis, [signal]);
									},
								},
								[
									"Specific Signs",
									`specific-signs-${i1}`,
									...this.props.signs.map((_sign, i2) => {
										return {
											text: `${converter.toWordsOrdinal(i2 + 1)} sign`,
											isSelected: () =>
												this.state.selected === `signal ${i1} ${i2}`,
											onClick: () => {
												this.select(`signal ${i1} ${i2}`);
												this.props.changeGraph(SignalAnalysis, [
													signal,
													i2 + 1,
												]);
											},
										};
									}),
								],
								[
									"Specific Results",
									`specific-results-${i1}`,
									{
										text: "Nothing",
										isSelected: () =>
											this.state.selected === `signal-result ${i1} 0`,
										onClick: () => {
											this.select(`signal-result ${i1} 0`);
											this.props.changeGraph(SignalAnalysis, [
												signal,
												"result",
												"Nothing",
											]);
										},
									},
									[
										"Hitting Signs",
										`hitting-signs-${i1}`,
										...hittingResults.map((result, i2) => {
											return {
												text: result,
												isSelected: () =>
													this.state.selected ===
													`signal-result ${i1} ${i2 + 1}`,
												onClick: () => {
													this.select(`signal-result ${i1} ${i2 + 1}`);
													this.props.changeGraph(SignalAnalysis, [
														signal,
														"result",
														result,
													]);
												},
											};
										}),
									],
									[
										"Pitching Signs",
										`pitching-signs-${i1}`,
										...pitchingResults.map((result, i2) => {
											return {
												text: result,
												isSelected: () =>
													this.state.selected ===
													`signal-result ${i1} ${i2 + 11}`,
												onClick: () => {
													this.select(`signal-result ${i1} ${i2 + 11}`);
													this.props.changeGraph(SignalAnalysis, [
														signal,
														"result",
														result,
													]);
												},
											};
										}),
									],
								],
							];
						}),
					]}
				></Accordion>
				<Accordion
					title="Analyze a Position"
					id="analyze-position"
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
								this.props.changeGraph(PositionAnalysis, ["2nd-to-last"]);
							},
						},
						...new Array(maxSignLength).fill(null).map((_v, i) => {
							return {
								text: `${converter.toWordsOrdinal(i + 1)} signal`,
								isSelected: () => this.state.selected === `position ${i}`,
								onClick: () => {
									this.select(`position ${i}`);
									this.props.changeGraph(PositionAnalysis, [i + 1]);
								},
							};
						}),
					]}
				></Accordion>
				<Accordion
					title="Analyze a Specific Result"
					id="analyze-specific-result"
					items={[
						{
							text: "Nothing",
							isSelected: () => this.state.selected === `result 0`,
							onClick: () => {
								this.select(`result 0`);
								this.props.changeGraph(ResultAnalysis, ["Nothing"]);
							},
						},
						[
							"Hitting Signs",
							"hitting-signs",
							...hittingResults.map((res, i) => {
								return {
									text: res,
									isSelected: () => this.state.selected === `result ${i + 1}`,
									onClick: () => {
										this.select(`result ${i + 1}`);
										this.props.changeGraph(ResultAnalysis, [res]);
									},
								};
							}),
						],
						[
							"Pitching Signs",
							"pitching-signs",
							...pitchingResults.map((res, i) => {
								return {
									text: res,
									isSelected: () => this.state.selected === `result ${i + 11}`,
									onClick: () => {
										this.select(`result ${i + 11}`);
										this.props.changeGraph(ResultAnalysis, [res]);
									},
								};
							}),
						],
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
					text="all results"
					selected={this.state.selected === "all-results"}
					onClick={() => {
						this.select("all-results");
						this.props.changeGraph(ResultAnalysis);
					}}
					leftOffset={0}
				></Content>
				<Content
					text="all signals"
					selected={this.state.selected === "all-signals"}
					onClick={() => {
						this.select("all-signals");
						this.props.changeGraph(PositionAnalysis);
					}}
					leftOffset={0}
				></Content>
			</div>
		);
	}
}

export default AnalyzePanel;
