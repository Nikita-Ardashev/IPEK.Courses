import './profile.sass';

import { iconPencil } from '@assets/assets';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import GroupCard from '@/common/ui/groupCard/card';
import LargeButton from '@/common/ui/largeButton/largeButton';
import Preloader from '@/common/ui/preloader/preloader';
import { store } from '@/store/store';

const Profile = observer((): React.JSX.Element => {
	const profile = store.profile?.getProfile;
	const navigate = useNavigate();
	if (profile === undefined) {
		navigate('/');
		return <Preloader />;
	}
	const isEditable = profile?.roleName === 'Admin';
	const group = useMemo(() => {
		return store.getGroup(profile.groupId);
	}, [profile]);
	return (
		<div className='profile'>
			{profile.roleName === 'Admin' && (
				<div className='profile__heading'>
					<div>
						<h2>{`${profile.firstName} ${profile.secondName} ${profile.thirdName}`}</h2>
						<p>{profile.email}</p>
						<p>{group?.name ?? 'Без имени'}</p>
					</div>
					{isEditable && <LargeButton img={iconPencil} />}
				</div>
			)}
			<div className='profile__courses'>
				<h2>Курсы</h2>
				<div className='profile__courses-row'></div>
			</div>
			{profile.roleName === 'Admin' ? (
				<div className='profile__groups'>
					<h2>Группы</h2>
					<div className='profile__groups-row'>
						{store.getGroups.map((g) => {
							return (
								<GroupCard
									key={g.id}
									nameGroup={g.name ?? 'Без имени'}
									id={g.id}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<div className='profile__complete-courses'>
					<h2>Пройденные курсы</h2>
					<div className='profile__complete-row'></div>
				</div>
			)}
		</div>
	);
});

export default Profile;
