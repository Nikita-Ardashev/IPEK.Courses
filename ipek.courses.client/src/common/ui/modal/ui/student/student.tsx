import { observer } from 'mobx-react-lite';
import React, { type ChangeEvent, useState } from 'react';

import { store } from '@/store/store';

import ModalField from '../../../field/field';
import { type IModalStudentFields, TModalStudent } from '../../model/types';
import Submit from '../sumbit/submit';
const ModalStudent = observer((): React.JSX.Element => {
	const [studentData, setStudentData] = useState<IModalStudentFields>({
		firstName: '',
		secondName: '',
		thirdName: '',
		groupId: '',
		email: '',
		password: '',
		id: 'string',
	});
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
	const groupsName = groups.map((g) => g.name ?? 'Без имени');
	const onCreate = () => {
		const groupId = groups.find((g) => g.name === studentData.groupId)?.id;
		console.log(studentData);
		console.log(Object.values(studentData).some((el: string) => el === ''));
		if (
			groupId === undefined ||
			Object.values(studentData).some((el: string) => el === '')
		)
			return;
		store.fetchCreateStudent({
			...studentData,
			groupId,
			roleName: 'Student',
		});
	};
	return (
		<>
			<div className='modal-student modal-fields'>
				<ModalField
					placeholder='Группа'
					name='groupId'
					onChange={changeStudentData}
					dropdown={{ items: groupsName }}
				/>
				<ModalField
					placeholder='Фамилия'
					name='firstName'
					onChange={changeStudentData}
				/>
				<ModalField
					placeholder='Имя'
					name='secondName'
					onChange={changeStudentData}
				/>
				<ModalField
					placeholder='Отчество'
					name='thirdName'
					onChange={changeStudentData}
				/>
				<ModalField
					placeholder='E-mail'
					name='email'
					onChange={changeStudentData}
				/>
				<ModalField
					placeholder='Пароль'
					name='password'
					onChange={changeStudentData}
				/>
			</div>
			<Submit text='Создать' onClick={onCreate} />
		</>
	);
});

export default ModalStudent;
