import './submit.sass';

import React, { HTMLAttributes } from 'react';

interface ISubmit {
	text: string;
	onClick?: () => void;
}

const Submit = ({ text, onClick }: ISubmit) => {
	return (
		<button onClick={onClick} className='modal__submit'>
			{text}
		</button>
	);
};

export default Submit;
