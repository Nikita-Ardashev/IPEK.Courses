import './group.sass';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { group, type IProfileDataUser } from '@/common/api/api';
// import LargeButton from '@/common/ui/largeButton/largeButton';
import ListItem from '@/common/ui/listItem/listItem';

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
