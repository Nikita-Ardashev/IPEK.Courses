import './warning.styl';

import React from 'react';
interface IModalWarning {
	text: string | React.ReactNode;
	onSuccess: () => void;
}

const ModalWarning = ({ text, onSuccess }: IModalWarning): React.JSX.Element => {
	return (
		<div className='modal-warning'>
			<h2>Подтверждение</h2>
			<p>{text}</p>
			<div>
				<input type='button' value='Нет' />
				<input type='button' value='Да' onClick={onSuccess} />
			</div>
		</div>
	);
};

export default ModalWarning;
