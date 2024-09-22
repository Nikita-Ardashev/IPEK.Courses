import './group.sass';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import LargeButton from '@/common/ui/largeButton/largeButton';
import ListItem from '@/common/ui/listItem/listItem';
import Preloader from '@/common/ui/preloader/preloader';
import { store } from '@/store/store';

const Group = observer((): React.JSX.Element => {
	const searchParams = useSearchParams()[0];
	const id = searchParams.get('id');
	if (id === null) return <p>Нет id группы: {id}</p>;
	const group = store.getGroups.find((g) => g.id === id);
	if (group === undefined) return <Preloader />;

	return (
		<div className='group'>
			<div className='group__heading'>
				<h2>{group.name}</h2>
				{store.user?.roleName === 'Admin' && <LargeButton />}
			</div>
			<div className='group__list'>
				{group.students.map((s) => {
					return (
						<ListItem
							key={s.id}
							text={`${s.firstName} ${s.secondName} ${s.thridName}`}
						/>
					);
				})}
			</div>
		</div>
	);
});

export default Group;
