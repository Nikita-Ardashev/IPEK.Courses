import './listItem.styl';

import iconDelete from '@img/admin/delete.svg';
import iconEdit from '@img/admin/pencil.svg';
import React from 'react';
import { Link } from 'react-router-dom';

interface IListItem {
	to?: string | null;
	index?: number;
	isEdit?: boolean;
	text: string;
	onEdit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	content?: React.ReactNode | null;
}

const ListItem = ({
	content = null,
	to = null,
	isEdit = false,
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
			{isEdit && content === null && (
				<div className='list-item__edit'>
					<button type='button' onClick={onEdit}>
						<img src={iconEdit} alt='' />
					</button>
					<button type='button' onClick={onDelete}>
						<img src={iconDelete} alt='' />
					</button>
				</div>
			)}
			{content}
		</div>
	);
};

export default ListItem;
