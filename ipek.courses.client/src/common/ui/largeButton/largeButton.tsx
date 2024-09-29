import './largeButton.sass';

import { iconPencil } from '@assets/assets';
import { observer } from 'mobx-react-lite';
import React, { type HtmlHTMLAttributes, memo } from 'react';
import { Link } from 'react-router-dom';

interface ILargeButton {
	img?: string;
	attr?: HtmlHTMLAttributes<HTMLButtonElement | HTMLHyperlinkElementUtils>;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	value?: string;
	link?: string;
}

const LargeButton = memo(
	observer(({ attr, img, onClick, value, link }: ILargeButton): React.JSX.Element => {
		if (link !== undefined) {
			return (
				<Link to={link} className='large-button' {...attr}>
					{value ?? <img src={img ?? iconPencil} alt='' />}
				</Link>
			);
		}
		return (
			<button className='large-button' {...attr} onClick={onClick}>
				{value ?? <img src={img ?? iconPencil} alt='' />}
			</button>
		);
	}),
);

export default LargeButton;
