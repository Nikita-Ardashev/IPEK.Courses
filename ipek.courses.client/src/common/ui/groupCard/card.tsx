import './card.sass';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
interface IGroupCard {
	id: string;
	nameGroup: string;
	color?: string;
}

const GroupCard = observer(
	({ id, nameGroup, color = '#43455429' }: IGroupCard): React.JSX.Element => {
		return (
			<Link to={`/group?id=${id}`} className='group-card'>
				<span style={{ background: color }}></span>
				<p>{nameGroup}</p>
			</Link>
		);
	},
);

export default GroupCard;
