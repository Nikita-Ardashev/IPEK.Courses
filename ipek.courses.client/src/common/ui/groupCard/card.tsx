import './card.styl';

import React from 'react';
import { Link } from 'react-router-dom';
interface IGroupCard {
	linkGroup: string;
	nameGroup: string;
	color?: string;
}

const GroupCard = ({ linkGroup, nameGroup, color = '#43455429' }: IGroupCard): React.JSX.Element => {
	return (
		<Link to={linkGroup} className='group-card'>
			<span style={{ background: color }}></span>
			<p>{nameGroup}</p>
		</Link>
	);
};

export default GroupCard;
