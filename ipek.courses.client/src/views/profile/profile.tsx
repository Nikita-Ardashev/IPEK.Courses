import './profile.sass';

import iconPencil from '@img/account/pencil.svg';
import { observer } from 'mobx-react-lite';
import React from 'react';

import GroupCard from '@/common/ui/groupCard/card';
import LargeButton from '@/common/ui/largeButton/largeButton';
import { store } from '@/store/store';

const Profile = observer((): React.JSX.Element => {
	const profile = store.user?.getProfile;
	const isEditable = profile?.roleName === 'Admin';
	return (
		<div className='profile'>
			{profile?.roleName === 'Admin' && (
				<div className='profile__info'>
					<div>
						<h2>{`${profile.firstName} ${profile.secondName} ${profile.thridName}`}</h2>
						<p>{profile.email}</p>
						<p>{profile.group}</p>
					</div>
					{isEditable && <LargeButton img={iconPencil} />}
				</div>
			)}
			<div className='profile__courses'>
				<h2>Курсы</h2>
				<div className='profile__courses-row'></div>
			</div>
			{profile?.roleName === 'Admin' ? (
				<div className='profile__groups'>
					<h2>Группы</h2>
					<div className='profile__groups-row'>
						{store.getGroups.map((g) => {
							return <GroupCard key={g.id} nameGroup={g.name} id={g.id} />;
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
