import React from 'react';

interface IModalSwitchBtn {
	type: string;
	content: string | React.ReactNode;
	modalType: string;
	switchModal: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalSwitchBtn = ({ type, content, modalType, switchModal }: IModalSwitchBtn): React.JSX.Element => {
	return (
		<label>
			<input
				type='checkbox'
				hidden
				data-set-modal-type={type}
				checked={modalType === type}
				onChange={switchModal}
			/>
			<p>{content}</p>
		</label>
	);
};

export default ModalSwitchBtn;
