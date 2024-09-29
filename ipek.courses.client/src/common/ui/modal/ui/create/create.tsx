import './create.sass';

import { observer } from 'mobx-react-lite';
import React, { useMemo, useState } from 'react';

import { type IModalCreate, type IModalEditType } from '../../model/types';
import ModalCourse from '../course/course';
import ModalGroup from '../group/group';
import ModalStudent from '../student/student';
import ModalSwitchBtn from '../switchBtn/switchBtn';
const ModalCreate = observer(({ type, onCreate }: IModalCreate): React.JSX.Element => {
	const [modalType, setModalType] = useState<IModalEditType>(type);

	const dataGroupSave = (): void => {};

	const dataCourseSave = (): void => {};

	const modal = useMemo(() => {
		switch (modalType) {
			case 'group':
				return <ModalGroup />;
			case 'student':
				return <ModalStudent />;
			case 'course':
			default:
				return <ModalCourse />;
		}
	}, [modalType]);
	const switchModalCreate = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const type = e.currentTarget.dataset.setModalType as IModalEditType;
		setModalType(type);
	};
	return (
		<div className='modal-create '>
			<h2>Создание</h2>
			<span>
				<ModalSwitchBtn
					type='student'
					content='Ученик'
					modalType={modalType}
					switchModal={switchModalCreate}
				/>
				<ModalSwitchBtn
					type='group'
					content='Группа'
					modalType={modalType}
					switchModal={switchModalCreate}
				/>
				<ModalSwitchBtn
					type='course'
					content='Курс'
					modalType={modalType}
					switchModal={switchModalCreate}
				/>
			</span>
			{modal}
		</div>
	);
});

export default ModalCreate;
