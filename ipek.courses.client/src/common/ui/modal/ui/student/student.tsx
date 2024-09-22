import React, { type ChangeEvent, useState } from 'react';

import { store } from '@/store/store';

import { type IModalStudentFields, TModalStudent } from '../../model/types';
import ModalField from '../field/field';
const ModalStudent = (): React.JSX.Element => {
	const [studentData, setStudentData] = useState<IModalStudentFields>({});
	const changeStudentData = (
		e: ChangeEvent<HTMLInputElement> | HTMLInputElement,
	): void => {
		setStudentData((v) => {
			if (e instanceof HTMLInputElement) {
				const name = e.name as TModalStudent;
				v[name] = e.value;
				return { ...v };
			}
			const name = e.target.name as TModalStudent;
			v[name] = e.target.value;
			return { ...v };
		});
	};
	const groups = store.getGroups;
	const groupsName = groups.map((g) => g.name);
	return (
		<div className='modal-student modal-fields'>
			<ModalField
				placeholder='Группа'
				name='group'
				onChange={changeStudentData}
				dropdownItems={groupsName}
			/>
			<ModalField
				placeholder='Фамилия'
				name='firstName'
				onChange={changeStudentData}
			/>
			<ModalField placeholder='Имя' name='secondName' onChange={changeStudentData} />
			<ModalField
				placeholder='Отчество'
				name='thridName'
				onChange={changeStudentData}
			/>
			<ModalField placeholder='Логин' name='login' onChange={changeStudentData} />
			<ModalField placeholder='Пароль' name='password' onChange={changeStudentData} />
		</div>
	);
};

export default ModalStudent;
