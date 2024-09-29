import './group.sass';

import { observer } from 'mobx-react-lite';
import { getSnapshot, onSnapshot, SnapshotIn } from 'mobx-state-tree';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TStateType, TUser } from '@/common/types/types';
import LargeButton from '@/common/ui/largeButton/largeButton';
import ListItem from '@/common/ui/listItem/listItem';
import Preloader from '@/common/ui/preloader/preloader';
import { store } from '@/store/store';

const Group = observer((): React.JSX.Element => {
	const searchParams = useSearchParams()[0];
	const groupId = searchParams.get('id');
	if (groupId === null) return <p>Нет id группы: {groupId}</p>;
	const group = store.getGroup(groupId);
	const [users, setUsers] = useState<TUser[]>(
		store.getUsers.filter((u) => u.groupId === groupId),
	);
	const isLoadingUser =
		store.fetchActionsModel.getStateFromName('fetchUsers').state ?? 'error';
	useEffect(() => {
		if (group === undefined) return;
		store.getUsersFromId(group.userIds);
		onSnapshot(store.users, () => {
			setUsers(store.getUsers);
		});
	}, [group]);

	const usersRender = useMemo(() => {
		return users.map((s, i) => {
			return (
				<ListItem
					key={s.id}
					text={`${s.firstName} ${s.secondName} ${s.thirdName}`}
					index={i}
				/>
			);
		});
	}, [users.length]);
	return (
		<div className='group'>
			<div className='group__heading'>
				<h2>{group?.name}</h2>
				{store.profile?.roleName === 'Admin' && <LargeButton />}
			</div>
			<div className='group__list'>
				{group === undefined || isLoadingUser !== 'done' ? (
					<Preloader />
				) : (
					usersRender
				)}
			</div>
		</div>
	);
});

export default Group;
