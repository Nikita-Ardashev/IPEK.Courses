import './create.styl';

import React, { useMemo, useState } from 'react';

import { courseSave, type ICourse, type IRegisterationGroup, registerationGroup } from '@/common/api/api';

import { type IModalCreate, type IModalEditType } from '../../model/types';
import ModalCourse from '../course/course';
import ModalGroups from '../groups/groups';
// import ModalStudent from '../student/student';
import ModalSwitchBtn from '../switchBtn/switchBtn';
const ModalCreate = ({ type, onCreate }: IModalCreate): React.JSX.Element => {
	const [modalType, setModalType] = useState<IModalEditType>(type);

	const [dataGroup, setDataGroup] = useState<IRegisterationGroup | null>(null);
	const [dataCourse, setDataCourse] = useState<ICourse | null>(null);
	const returnDataGroup = (data: IRegisterationGroup | null): void => {
		setDataGroup(data);
	};

	const dataGroupSave = (): void => {
		dataGroup !== null &&
			registerationGroup(dataGroup)
				.then((r) => {
					console.log(r);
				})
				.catch((e) => {
					console.error(e);
				});
	};

	const dataCourseSave = (): void => {
		console.log(dataCourse);
		dataCourse !== null &&
			courseSave(dataCourse)
				.then((r) => {
					console.log(r);
				})
				.catch((e) => {
					console.error(e);
				});
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
				<ModalSwitchBtn type='group' content='Группа' modalType={modalType} switchModal={switchModalCreate} />
				<ModalSwitchBtn type='course' content='Курс' modalType={modalType} switchModal={switchModalCreate} />
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
