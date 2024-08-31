import './group.sass';

import React from 'react';

// import LargeButton from '@/common/ui/largeButton/largeButton';

const Group = (): React.JSX.Element => {
	return (
		<div className='group'>
			<div className='group__heading'>
				<h2>Группа И-20-3</h2>
				{/* <LargeButton /> */}
			</div>
			<div className='group__list'></div>
		</div>
	);
};

export default Group;
