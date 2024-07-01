import React, { type ChangeEvent, useState } from 'react';

import { type IModalStudent, type IModalStudentFields, type TModalStudent } from '../../model/types';
import ModalField from '../field/field';
const ModalStudent = (props: IModalStudent): React.JSX.Element => {
	const callback = props.useCallbackStudentData;
	const [studentData, setStudentData] = useState<IModalStudentFields>(props);
	const changeStudentData = (e: ChangeEvent<HTMLInputElement>): void => {
		const t = e.currentTarget;
		const name = t.name as TModalStudent;
		const value = t.value.trim();
		setStudentData((val) => {
			const newVal = { ...val };
			newVal[name] = value;
			return newVal;
		});
		callback?.(studentData);
	};
	return (
		<div className='modal-student modal-fields'>
			<ModalField placeholder='Фамилия' name='firstName' onChange={changeStudentData} />
			<ModalField placeholder='Имя' name='secondName' onChange={changeStudentData} />
			<ModalField placeholder='Отчество' name='thridName' onChange={changeStudentData} />
			<ModalField placeholder='Группа' name='group' onChange={changeStudentData} />
			<ModalField placeholder='Логин' name='login' onChange={changeStudentData} />
			<ModalField placeholder='Пароль' name='password' onChange={changeStudentData} />
		</div>
	);
};

export default ModalStudent;
