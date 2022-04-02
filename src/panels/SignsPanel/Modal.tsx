import React from "react";
import { fullnames } from "../../App";

interface ModalProps {
	open: boolean;
	currentEdit: Array<keyof typeof fullnames>;
	onCancel: (_e?: React.MouseEvent) => void;
	onFinished: (_e?: React.MouseEvent) => void;
	onBackspace: (_e?: React.MouseEvent) => void;
	onAdd: (signal: keyof typeof fullnames) => void;
}

class Modal extends React.Component<ModalProps> {
	render() {
		return (
			<div
				className={`fixed flex justify-center items-center z-[9998] top-0 left-0 w-full h-full bg-black bg-opacity-40 transition-opacity ${
					this.props.open
						? "opacity-1 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
			>
				<div className="relative flex flex-col w-4/5 h-4/5 rounded-sm md:w-2/3 md:h-2/3">
					<header className="flex items-center w-full min-h-[3rem] flex-shrink-0 rounded-t-sm bg-white dark:bg-gray-700">
						<div className="flex flex-wrap gap-y-2 justify-center items-center w-[calc(100%-3.5rem)] h-full bg-slate-400 dark:bg-slate-500">
							{this.props.currentEdit.map((signal, i2) => {
								return (
									<div
										key={i2}
										className="signal-wrapper relative flex justify-center items-center max-w-[3rem] min-w-[24px] aspect-square max-h-full mx-1 rounded-sm transition-colors bg-gray-50  hover:bg-gray-200 dark:bg-gray-300 dark:hover:bg-gray-400"
										style={{
											width: `${100 / this.props.currentEdit.length}%`,
										}}
									>
										<span className="cursor-default">{signal}</span>
										<div className="tooltip inline-block absolute z-[9999] bottom-[calc(100%+4px)] cursor-default py-1 px-2 text-sm font-medium text-cool-white whitespace-nowrap bg-gray-900 rounded-lg shadow-sm transition-opacity dark:bg-gray-700">
											{fullnames[signal]}
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
						<button
							className="material-icons-outlined absolute right-2 px-1 leading-10 text-4xl rounded-sm cursor-pointer transition-colors text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-cool-white dark:hover:bg-gray-600"
							tabIndex={this.props.open ? 0 : -1}
							onClick={this.props.onBackspace}
						>
							backspace
						</button>
					</header>
					<main className="flex justify-center items-center w-full flex-grow bg-gray-500 dark:bg-gray-600">
						<div className="flex flex-wrap gap-5 justify-center w-full">
							{Object.keys(fullnames).map((name: any, i) => {
								return (
									<button
										key={i}
										className="signal-wrapper flex relative justify-center items-center w-12 h-12 cursor-pointer shadow-md rounded-md bg-gray-100 hover:bg-gray-300 md:w-16 md:h-16 dark:bg-cool-white dark:hover:bg-gray-400"
										tabIndex={this.props.open ? 0 : -1}
										onClick={() => this.props.onAdd(name)}
									>
										<span className="text-xl">{name}</span>
										<div className="tooltip inline-block absolute z-[20000] bottom-[calc(100%+4px)] cursor-default py-1 px-2 text-sm font-medium text-cool-white whitespace-nowrap bg-gray-900 rounded-lg shadow-sm transition-opacity dark:bg-gray-700">
											{fullnames[name as keyof typeof fullnames]}
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
					</main>
					<footer className="w-full h-12 flex-shrink-0 rounded-b-sm bg-gray-100 dark:bg-gray-300">
						<button
							className="float-left p-0 w-20 h-full border-2 border-gray-400 bg-white rounded-sm text-gray-600 font-roboto text-opacity-70 dark:bg-gray-100"
							tabIndex={this.props.open ? 0 : -1}
							onClick={this.props.onCancel}
						>
							Cancel
						</button>
						<button
							className="float-right p-0 w-20 h-full rounded-sm text-white font-roboto bg-blue-submit"
							tabIndex={this.props.open ? 0 : -1}
							onClick={this.props.onFinished}
						>
							Done
						</button>
					</footer>
				</div>
			</div>
		);
	}
}

export default Modal;
