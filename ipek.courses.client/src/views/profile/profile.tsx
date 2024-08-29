import './profile.sass';

import React from 'react';

const Profile = (): React.JSX.Element => {
	const isAdmin = false;

	return (
		<div className='profile'>
			{isAdmin && (
				<div className='profile__info'>
					<div>
						<h2></h2>
						<p></p>
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
