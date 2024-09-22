import './groups.sass';

import iconDelete from '@img/admin/delete.svg';
import iconPencil from '@img/admin/pencil.svg';
import iconUpload from '@img/admin/upload.svg';
import React, { useState } from 'react';

import { parsingAddedListGroup } from '@/common/utils/parsingExcel';

import { type IStudentInGroup } from '../../model/types';
import ModalField from '../field/field';

const ModalGroups = (): React.JSX.Element => {
	const [groupList, setGroupList] = useState<Array<IStudentInGroup['fullname']> | null>(
		null,
	);
	const [groupTitle, setGroupTitle] = useState<string>('');
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
			const { column, title } = parsingAddedListGroup(e.target.result as Uint8Array);
			setGroupTitle(title);
			setGroupList(column);
		};
		reader.onerror = (err) => {
			console.log(err);
		};
		reader.readAsArrayBuffer(file);
		e.currentTarget.files = null;
	};
	const deleteGroup = (): void => {
		setGroupList(null);
		setGroupTitle('');
	};
	return (
		<div className='modal-edit modal-fields'>
			<ModalField placeholder='Группа' value={groupTitle} />
			<div className='modal-edit__students'>
				{groupList?.map((student) => (
					<div key={student}>
						<p>{student}</p>
						<span>
							<button>
								<img src={iconPencil} alt='' />
							</button>
							<button>
								<img src={iconDelete} alt='' />
							</button>
						</span>
					</div>
				))}
			</div>
			{groupList === null ? (
				<label>
					<input type='file' hidden onChange={loadGroup} />
					<img src={iconUpload} alt='' />
					<p>Загрузить список</p>
				</label>
			) : (
				<button onClick={deleteGroup}>
					<img src={iconDelete} alt='' />
					<p>Удалить список</p>
				</button>
			)}
		</div>
	);
};

export default ModalGroups;
