import './profile.styl';

// import iconPencil from '@img/account/pencil.svg';
import React, { useContext, useEffect, useState } from 'react';

import CourseCard from '@/common/ui/courseCard/card';
import GroupCard from '@/common/ui/groupCard/card';
// import LargeButton from '@/common/ui/largeButton/largeButton';
import Preloader from '@/common/ui/preloader/preloader';

import { GlobalContext } from '../globalContext';
const Profile = (): React.JSX.Element => {
	const globalContext = useContext(GlobalContext);
	const user = globalContext?.user;
	const isAdmin = user?.is_admin ?? false;

	// if (false) return <Preloader />;
	return (
		<div className='profile'>
			{isAdmin && (
				<div className='profile__info'>
					<div>
						<h2>{user?.name}</h2>
						<p>{user?.group}</p>
					</div>
					{/* <LargeButton img={iconPencil} /> */}
				</div>
			)}
			<div className='profile__courses'>
				<h2>Курсы</h2>
				<div className='profile__courses-row'></div>
			</div>
			{isAdmin ? (
				<div className='profile__groups'>
					<h2>Группы</h2>
					<div className='profile__groups-row'></div>
				</div>
			) : (
				<div className='profile__complete-courses'>
					<h2>Пройденные курсы</h2>
					<div className='profile__complete-row'></div>
				</div>
			)}
		</div>
	);
};

export default Profile;
