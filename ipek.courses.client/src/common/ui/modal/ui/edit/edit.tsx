import React, { useMemo } from 'react';

import { type IModalEdit } from '../../model/types';
import ModalCourse from '../course/course';
import ModalGroups from '../groups/groups';
import ModalStudent from '../student/student';

const ModalEdit = ({ type, onCreate }: IModalEdit): React.JSX.Element => {
	const modal = useMemo(() => {
		switch (type) {
			case 'group':
				return <ModalGroups />;
			case 'student':
				return <ModalStudent />;
			case 'course':
			default:
				return <ModalCourse />;
		}
	}, [type]);
	return (
		<div>
			{modal}
			<button onClick={onCreate} className='modal__submit'>
				Изменить
			</button>
		</div>
	);
};

export default ModalEdit;
