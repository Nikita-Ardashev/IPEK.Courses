import './notify.styl';

import colseIcon from '@img/account/close.svg';
import alertIcon from '@img/notify/alert.svg';
import errorIcon from '@img/notify/error.svg';
import successIcon from '@img/notify/success.svg';
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
				return alertIcon;
			case 'error':
				return errorIcon;
			case 'success':
				return successIcon;
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
						<img src={colseIcon} alt='' />
					</button>
				</span>
				<p>{text}</p>
			</div>
		</div>
	);
};

export default Notify;
