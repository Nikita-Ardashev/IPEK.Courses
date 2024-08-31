import './create.sass';

import React, { useMemo, useState } from 'react';

import { type ICourse } from '@/common/api/api';

import { type IModalCreate, type IModalEditType } from '../../model/types';
import ModalCourse from '../course/course';
import ModalGroups from '../groups/groups';
// import ModalStudent from '../student/student';
import ModalSwitchBtn from '../switchBtn/switchBtn';
const ModalCreate = ({ type, onCreate }: IModalCreate): React.JSX.Element => {
	const [modalType, setModalType] = useState<IModalEditType>(type);

	const [dataCourse, setDataCourse] = useState<ICourse | null>(null);
	const returnDataGroup = (data: any | null): void => {};

	const dataGroupSave = (): void => {};

	const dataCourseSave = (): void => {
		console.log(dataCourse);
	};

	const modal = useMemo(() => {
		switch (modalType) {
			case 'group':
				return <ModalGroups useCallbackData={returnDataGroup} />;
			// case 'student':
			// 	return <ModalStudent />;
			case 'course':
			default:
				return <ModalCourse useCallbackData={setDataCourse} />;
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
				{/* <ModalSwitchBtn type='student' content='Ученик' modalType={modalType} switchModal={switchModalCreate} /> */}
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
			<button
				onClick={() => {
					switch (modalType) {
						case 'group':
							dataGroupSave();
							break;
						case 'course':
							dataCourseSave();
							break;
					}
					onCreate();
				}}
				className='modal__submit'
			>
				Создать
			</button>
		</div>
	);
};

export default ModalCreate;
