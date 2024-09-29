import './group.sass';

import { iconAdminDelete, iconAdminUpload } from '@assets/assets';
import React, { useCallback, useMemo, useState } from 'react';

import { IApiCreateGroupWithUsers } from '@/common/api/types';
import { TUser } from '@/common/types/types';
import { IParsingAddedListGroup, parsingAddedListGroup } from '@/common/utils/parsingExcel';
import { store } from '@/store/store';

import ModalField from '../../../field/field';
import FieldControl from '../fieldControl/fieldControl';
import Submit from '../sumbit/submit';

interface IStudentFields {
	fullname: string;
	email: string;
	phone: string;
	birthday: string;
}

const ModalGroup = (): React.JSX.Element => {
	const [group, setGroup] = useState<
		IParsingAddedListGroup<keyof IStudentFields> | undefined
	>();
	const loadGroup = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.currentTarget.files === null) return;
		const file = e.currentTarget.files[0];
		if (file.type !== 'application/vnd.ms-excel') {
			alert('Должен быть Excel файлом');
			return;
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target === null) return;
			const parsingGroup = parsingAddedListGroup<keyof IStudentFields>(
				e.target.result as Uint8Array,
				[
					{ search: 'ФИО', name: 'fullname' },
					{ search: 'E-mail', name: 'email' },
					{ search: 'Телефон', name: 'phone' },
					{ search: 'Дата рождения', name: 'birthday' },
				],
			);
			setGroup(parsingGroup ?? null);
		};
		reader.onerror = (err) => {
			console.log(err);
		};
		reader.readAsArrayBuffer(file);
		e.currentTarget.files = null;
	};
	const deleteGroup = (): void => {
		setGroup(undefined);
	};
	const deleteStudent = useCallback((index: number) => {
		setGroup((v) => {
			if (v === undefined) return;
			const newV = { ...v };
			delete newV.students[index];
			return { ...newV, students: newV.students.filter((s) => s !== undefined) };
		});
	}, []);
	const editStudent = useCallback((index: number, value: string) => {
		setGroup((v) => {
			if (v === undefined) return;
			const newV = { ...v };
			newV.students[index].fullname = value;
			return newV;
		});
	}, []);
	const onCreate = () => {
		if (group === undefined) return;
		const users: IApiCreateGroupWithUsers['users'] = group.students.map((s) => {
			const userName = s.fullname.split(' ');
			const user: IApiCreateGroupWithUsers['users'][number] = {
				email: s.email,
				firstName: userName[0],
				secondName: userName[1],
				thirdName: userName[2],
				roleName: 'Student',
				phone: s.phone,
				password:
					`${group.title.charAt(0)}` +
					'-' +
					Number(s.birthday.replaceAll('.', '')).toString(16) +
					'.!' +
					Math.round(Math.random() * 100000).toString(16),
			};
			return user;
		});
		store.fetchCreateGroupWithStudents({ groupName: group.title, users });
	};
	const studentsRender = useMemo(() => {
		return group?.students.map((s, i) => (
			<FieldControl
				key={s.fullname + i}
				value={s.fullname}
				index={i}
				onDelete={deleteStudent}
				onEdit={editStudent}
			/>
		));
	}, [group?.students.length]);
	return (
		<>
			<div className='modal-groups modal-fields'>
				<ModalField placeholder='Группа' value={group?.title} />
				<div className='modal-groups__students'>{studentsRender}</div>
				{group === undefined ? (
					<label>
						<input type='file' accept='.xls' hidden onChange={loadGroup} />
						<img src={iconAdminUpload} alt='' />
						<p>Загрузить список</p>
					</label>
				) : (
					<button onClick={deleteGroup}>
						<img src={iconAdminDelete} alt='' />
						<p>Удалить список</p>
					</button>
				)}
			</div>
			<Submit text='Создать' onClick={onCreate} />
		</>
	);
};

export default ModalGroup;
