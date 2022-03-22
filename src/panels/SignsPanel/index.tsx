import React from "react";
import Modal from "./modal";
import { fullnames } from "../../App";

interface SignsPanelProps {
	signs: Array<Array<keyof typeof fullnames>>;
	deleteSign: (index: number) => void;
	changeSign: (index: number, sign: Array<keyof typeof fullnames>) => void;
	addSign: (sign: Array<keyof typeof fullnames>) => void;
	fullnames: typeof fullnames;
}

interface SignsPanelState {
	editing?: number;
	currentEdit?: Array<keyof typeof fullnames>;
}

class SignsPanel extends React.Component<SignsPanelProps> {
	state: SignsPanelState;

	constructor(props: any) {
		super(props);

		this.makeEditable = this.makeEditable.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.applyEdit = this.applyEdit.bind(this);

		this.state = {};
	}

	makeEditable(_e: React.MouseEvent, y: number) {
		let newState = { ...this.state };
		newState.editing = y;
		this.setState(newState);
	}

	cancelEdit(_e: React.MouseEvent) {
		let newState = { ...this.state };
		newState.editing = undefined;
		this.setState(newState);
	}

	applyEdit(_e: React.MouseEvent) {
		let newState = { ...this.state };
		if (typeof newState.editing === "number") {
			this.props.changeSign(newState.editing || 0, newState.currentEdit || []);
		}
		newState.editing = undefined;
		newState.currentEdit = undefined;

		this.setState(newState);
	}

	render() {
		return (
			<div className="w-full h-full bg-blue-200 overflow-auto dark:bg-[#6699cc]">
				<Modal
					open={typeof this.state.editing === "number"}
					onCancel={this.cancelEdit}
					onFinished={this.applyEdit}
				></Modal>
				<ol className="flex flex-col items-center w-full h-full gap-5 pt-8">
					{this.props.signs.map((sign, i1) => {
						return (
							<li
								key={i1}
								className="flex justify-center gap-x-3 w-5/6 h-8 md:h-12"
							>
								<div className="flex justify-center items-center w-3/4 h-full bg-red-400 shadow-md dark:shadow-gray-400">
									{sign.map((signal, i2) => {
										return (
											<div
												key={i2}
												className={`signal-wrapper relative flex justify-center items-center max-w-[2rem] aspect-square max-h-full mx-1 bg-green-400 transition-colors md:max-w-[3rem]`}
												style={{
													width: `${100 / sign.length}%`,
												}}
											>
												<span className="cursor-default">{signal}</span>
												<div className="tooltip inline-block absolute z-[1000] bottom-[calc(100%+4px)] cursor-default py-1 px-2 text-sm font-medium text-[#dcdcdc] whitespace-nowrap bg-gray-900 rounded-lg shadow-sm transition-opacity  dark:bg-gray-700">
													{this.props.fullnames[signal]}
												</div>
												<div
													className="tooltip-triangle w-1.5 h-1 absolute bottom-[calc(100%+4px)] translate-y-full bg-gray-900 transition-opacity dark:bg-gray-700"
													style={{
														clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
													}}
												></div>
											</div>
										);
									})}
								</div>
								<span
									className="material-icons-outlined cursor-pointer text-black rounded-md my-1 transition-colors md:my-3 hover:bg-[#d5d5e6] dark:text-gray-700 dark:hover:bg-[#bebebe]"
									onClick={(e) => this.makeEditable(e, i1)}
								>
									edit
								</span>
								<span
									className="material-icons-outlined cursor-pointer text-[#ff2828] rounded-md my-1 md:my-3 transition-colors hover:bg-[#f0d1d1] dark:hover:bg-red-300"
									onClick={() => this.props.deleteSign(i1)}
								>
									delete
								</span>
							</li>
						);
					})}
				</ol>
			</div>
		);
	}
}

export default SignsPanel;
