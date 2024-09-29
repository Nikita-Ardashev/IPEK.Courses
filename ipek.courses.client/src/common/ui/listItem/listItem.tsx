import './listItem.sass';

import { iconAdminDelete, iconAdminPencil } from '@assets/assets';
import { observer } from 'mobx-react-lite';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { store } from '@/store/store';

interface IListItem {
	to?: string | null;
	index?: number;
	text: string;
	onEdit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	content?: React.ReactNode | null;
}

const ListItem = memo(
	observer(
		({
			content = null,
			to = null,
			index,
			onDelete,
			onEdit,
			text,
		}: IListItem): React.JSX.Element => {
			const name = (
				<>
					<p>
						{index !== undefined && <span>{index + 1}. </span>}
						{text}
					</p>
				</>
			);
			return (
				<div className={`list-item`}>
					{to === null ? name : <Link to={to}>{name}</Link>}
					{store.profile?.roleName === 'Admin' && content === null && (
						<div className='list-item__edit'>
							<button type='button' onClick={onEdit}>
								<img src={iconAdminPencil} alt='' />
							</button>
							<button type='button' onClick={onDelete}>
								<img src={iconAdminDelete} alt='' />
							</button>
						</div>
					)}
					{content}
				</div>
			);
		},
	),
);

export default ListItem;
