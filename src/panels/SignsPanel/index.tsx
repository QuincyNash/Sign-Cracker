import React from "react";
import Modal from "./Modal";
import { fullnames, result } from "../../App";
import ResultModal from "./ResultModal";

interface SignsPanelProps {
	signs: Array<Array<keyof typeof fullnames>>;
	results: Array<result>;
	hidden: boolean;
	deleteSign: (index: number) => void;
	changeSign: (index: number, sign: Array<keyof typeof fullnames>) => void;
	changeResult: (index: number, res: result) => void;
}

interface SignsPanelState {
	editing?: number | string;
	currentEdit?: Array<keyof typeof fullnames>;
}

class SignsPanel extends React.Component<SignsPanelProps> {
	state: SignsPanelState;

	constructor(props: any) {
		super(props);

		this.makeEditable = this.makeEditable.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.applyEdit = this.applyEdit.bind(this);
		this.selectResult = this.selectResult.bind(this);
		this.backspace = this.backspace.bind(this);
		this.addSignal = this.addSignal.bind(this);

		this.state = {};
	}

	setTabbable(tabbable: boolean) {
		let items: NodeListOf<HTMLElement> = document.querySelectorAll(".flip-tab");
		for (let i = 0; i < items.length; i++) {
			items[i].tabIndex = tabbable ? 0 : -1;
		}
	}

	makeEditable(y: number) {
		this.setTabbable(false);

		let newState = { ...this.state };
		newState.editing = y;
		if (this.props.signs[y]) {
			newState.currentEdit = [...this.props.signs[y]];
		} else {
			newState.currentEdit = undefined;
		}
		this.setState(newState);
	}

	editResult(index: number) {
		this.setTabbable(false);

		let newState = { ...this.state };
		newState.editing = "result" + index.toString();
		this.setState(newState);
	}

	cancelEdit(_e?: React.MouseEvent) {
		this.setTabbable(true);

		let newState = { ...this.state };
		newState.editing = undefined;
		this.setState(newState);
	}

	applyEdit(_e?: React.MouseEvent) {
		let newState = { ...this.state };
		if (typeof newState.editing === "number") {
			this.props.changeSign(newState.editing || 0, newState.currentEdit || []);
		}
		newState.editing = undefined;
		newState.currentEdit = undefined;

		this.setState(newState);
	}

	selectResult(res: result) {
		if (typeof this.state.editing === "string") {
			let newState = { ...this.state };
			let index = parseInt(this.state.editing.replace("result", ""));
			this.props.changeResult(index, res);
			newState.editing = undefined;
			this.setState(newState);
		}
	}

	backspace(_e?: React.MouseEvent) {
		let newState = { ...this.state };
		newState.currentEdit?.pop();
		this.setState(newState);
	}

	addSignal(signal: keyof typeof fullnames) {
		let newState = { ...this.state };

		if (!newState.currentEdit) {
			newState.currentEdit = [];
		}
		if (newState.currentEdit.length < 49) {
			newState.currentEdit?.push(signal);
		}

		this.setState(newState);
	}

	render() {
		return (
			<div className="w-full h-full bg-blue-200 overflow-auto dark:bg-bright-blue">
				<Modal
					open={typeof this.state.editing === "number"}
					currentEdit={this.state.currentEdit || []}
					onCancel={this.cancelEdit}
					onFinished={this.applyEdit}
					onBackspace={this.backspace}
					onAdd={this.addSignal}
				></Modal>
				<ResultModal
					open={typeof this.state.editing === "string"}
					onCancel={this.cancelEdit}
					onSelect={this.selectResult}
				></ResultModal>
				<ol className="flex flex-col items-center w-full h-full gap-5 pt-8">
					{this.props.signs.map((sign, index) => {
						return (
							<li
								key={index}
								className={`flex justify-center items-center gap-x-3 w-11/12`}
							>
								<div className="flex flex-wrap gap-y-1 justify-center items-center w-3/4 h-auto bg-gray-100 rounded-sm shadow-lg shadow-neutral-400 dark:bg-neutral-300 dark:shadow-gray-500">
									{sign.map((signal, i2) => {
										return (
											<button
												key={i2}
												className="signal-wrapper relative flex justify-center items-center max-w-[2rem] min-w-[24px] aspect-square rounded-sm max-h-full mx-0.5 transition-colors shadow-md bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:text-cool-white dark:hover:bg-gray-700 dark:shadow-gray-500 md:max-w-[3rem]"
												tabIndex={
													this.state.editing !== undefined || this.props.hidden
														? -1
														: 0
												}
												style={{
													width: `${100 / sign.length}%`,
												}}
											>
												<span className="cursor-default">{signal}</span>
												<div className="tooltip inline-block absolute z-[1000] bottom-[calc(100%+4px)] cursor-default py-1 px-2 text-sm font-medium text-cool-white whitespace-nowrap bg-gray-900 rounded-lg shadow-sm transition-opacity dark:bg-gray-700">
													{fullnames[signal]}
												</div>
												<div
													className="tooltip-triangle w-1.5 h-1 absolute bottom-[calc(100%+4px)] translate-y-full bg-gray-900 transition-opacity dark:bg-gray-700"
													style={{
														clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
													}}
												></div>
											</button>
										);
									})}
								</div>
								<button
									className="w-20 max-w-[5rem] font-roboto border-gray-400 border-2 rounded-md transition-colors hover:bg-gray-400 dark:text-cool-white dark:bg-gray-500 dark:border-gray-600 dark:hover:bg-gray-600"
									onClick={() => this.editResult(index)}
									tabIndex={
										this.state.editing !== undefined || this.props.hidden
											? -1
											: 0
									}
								>
									{this.props.results[index]}
								</button>
								<button
									className="material-icons-outlined cursor-pointer text-black rounded-md my-1 transition-colors md:my-3 hover:bg-[#d5d5e6] dark:text-gray-700 dark:hover:bg-[#bebebe]"
									tabIndex={
										this.state.editing !== undefined || this.props.hidden
											? -1
											: 0
									}
									onClick={() => this.makeEditable(index)}
								>
									edit
								</button>
								<button
									className="material-icons-outlined cursor-pointer text-[#ff2828] rounded-md my-1 md:my-3 transition-colors hover:bg-[#f0d1d1] dark:hover:bg-red-300"
									tabIndex={
										this.state.editing !== undefined || this.props.hidden
											? -1
											: 0
									}
									onClick={() => this.props.deleteSign(index)}
								>
									delete
								</button>
							</li>
						);
					})}
					<li className="w-9 h-9 relative shadow-sm bg-blue-400 cursor-pointer rounded-full transition-{box-shadow} duration-300 hover:shadow-lg dark:bg-blue-300">
						<button
							className="material-icons text-4xl leading-9 rounded-full"
							tabIndex={
								this.state.editing !== undefined || this.props.hidden ? -1 : 0
							}
							onClick={() => this.makeEditable(this.props.signs.length)}
						>
							add
						</button>
					</li>
					<li>
						<div className="w-px h-px"></div>
					</li>
				</ol>
			</div>
		);
	}
}

export default SignsPanel;
