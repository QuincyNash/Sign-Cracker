import React from "react";

interface ModalProps {
	open: boolean;
	onCancel: React.MouseEventHandler;
	onFinished: React.MouseEventHandler;
}

class Modal extends React.Component<ModalProps> {
	constructor(props: any) {
		super(props);

		this.getModal = this.getModal.bind(this);
	}

	getModal() {
		return (
			<div className="fixed flex justify-center items-center z-[9999] top-0 left-0 w-full h-full bg-black bg-opacity-40">
				<div className="relative w-4/5 h-4/5 rounded-sm bg-red-400 md:w-1/2 md:h-1/2">
					<footer className="absolute bottom-0 w-full rounded-b-sm h-12 bg-white">
						<button
							className="float-left p-0 w-20 h-full border-2 border-gray-400 rounded-sm text-gray-600 font-roboto text-opacity-70"
							onClick={this.props.onCancel}
						>
							Cancel
						</button>
						<button
							className="float-right p-0 w-20 h-full rounded-sm text-white font-roboto bg-[#2196f3]"
							onClick={this.props.onFinished}
						>
							Done
						</button>
					</footer>
				</div>
			</div>
		);
	}

	render() {
		if (this.props.open) {
			return this.getModal();
		}
		return null;
	}
}

export default Modal;
