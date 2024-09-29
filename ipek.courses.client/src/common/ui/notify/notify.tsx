import './notify.sass';

import { iconAlert, iconClose, iconError, iconSuccess } from '@assets/assets';
import React, { useEffect } from 'react';
interface INotify {
	type: 'alert' | 'success' | 'error';
	title: string;
	text: string;
	onClose: () => void;
}

const Notify = ({ text, title, type, onClose }: INotify): React.JSX.Element => {
	const returnImgNotify = (): string => {
		switch (type) {
			case 'alert':
				return iconAlert;
			case 'error':
				return iconError;
			case 'success':
				return iconSuccess;
		}
	};
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [onClose]);
	return (
		<div className='notify'>
			<img src={returnImgNotify()} alt='' />
			<div>
				<span>
					<h4>{title}</h4>
					<button type='button'>
						<img src={iconClose} alt='' />
					</button>
				</span>
				<p>{text}</p>
			</div>
		</div>
	);
};

export default Notify;
