import React from "react";
import { result, results } from "../../App";

interface ResultModalProps {
	open: boolean;
	onSelect: (res: result) => void;
	onCancel: () => void;
}

class ResultModal extends React.Component<ResultModalProps> {
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
					<main className="flex justify-center items-center w-full flex-grow bg-gray-500 dark:bg-gray-600">
						<div className="flex flex-wrap w-full gap-2 justify-center md:gap-5">
							{results.map((result, i) => {
								return (
									<button
										key={i}
										className="signal-wrapper flex relative justify-center items-center w-12 h-12 text-xs break-words cursor-pointer shadow-md rounded-md bg-gray-100 hover:bg-gray-300 sm:w-16 sm:h-16 md:text-base lg:w-20 lg:h-20 dark:bg-cool-white dark:hover:bg-gray-400"
										tabIndex={this.props.open ? 0 : -1}
										onClick={() => this.props.onSelect(result as typeof result)}
									>
										{result}
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
					</footer>
				</div>
			</div>
		);
	}
}

export default ResultModal;
