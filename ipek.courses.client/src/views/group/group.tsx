import './group.styl';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { group, type IProfileDataUser } from '@/common/api/api';
// import LargeButton from '@/common/ui/largeButton/largeButton';
import ListItem from '@/common/ui/listItem/listItem';

const Group = (): React.JSX.Element => {
	const [dataGroup, setDataGroup] = useState<IProfileDataUser[]>([]);
	const [searchParams] = useSearchParams();
	const name = searchParams.get('name');
	const users = useMemo(() => {
		return dataGroup.map((s, i) => {
			return <ListItem key={s.name + i} text={s.name} index={i} />;
		});
	}, [dataGroup]);
	useEffect(() => {
		if (name !== null) {
			group(name)
				.then((r) => {
					setDataGroup(r);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [name]);
	return (
		<div className='group'>
			<div className='group__heading'>
				<h2>Группа И-20-3</h2>
				{/* <LargeButton /> */}
			</div>
			<div className='group__list'>{users}</div>
		</div>
	);
};

export default Group;
