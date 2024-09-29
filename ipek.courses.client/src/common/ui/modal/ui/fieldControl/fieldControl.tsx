import './fieldControl.sass';

import { iconAdminDelete, iconAdminPencil } from '@assets/assets';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, memo, useRef, useState } from 'react';

import { store } from '@/store/store';

interface IFieldControl {
	value: string;
	onEdit?: (index: number, text: string) => void;
	onDelete?: (index: number) => void;
	index?: number;
}

const FieldControl = memo(
	observer(({ value, onEdit, onDelete, index }: IFieldControl) => {
		const inputRef = useRef<HTMLInputElement>(null);
		const [inpValue, setInpValue] = useState<string>(value);
		const [isEdit, setIsEdit] = useState<boolean>(true);
		const deleteField = () => {
			onDelete && index !== undefined && onDelete(index);
		};
		const editField = (e: ChangeEvent<HTMLInputElement>) => {
			const v = e.target.value;
			setInpValue(v);
			onEdit && index !== undefined && onEdit(index, v);
		};
		return (
			<div className='modal-groups__student'>
				<input
					type='text'
					ref={inputRef}
					value={inpValue}
					readOnly={isEdit}
					onChange={editField}
				/>
				{store.profile?.getProfile.roleName === 'Admin' && (
					<span>
						<button
							onClick={() => {
								setIsEdit((v) => !v);
								if (inputRef.current === null) return;
								inputRef.current.focus();
							}}
						>
							<img src={iconAdminPencil} alt='Редактирование' />
						</button>
						<button onClick={deleteField}>
							<img src={iconAdminDelete} alt='Удаление' />
						</button>
					</span>
				)}
			</div>
		);
	}),
);

export default FieldControl;
