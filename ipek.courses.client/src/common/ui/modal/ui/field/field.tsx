import './field.sass';

import React, { useRef, useState } from 'react';
interface IModalField {
	className?: string;
	style?: Record<string, string>;
	dropdownItems?: string[] | null;
	value?: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement> | HTMLInputElement) => void;
	typeField?: string;
	readonly?: boolean;
	name?: string;
}

const ModalField = ({
	className = '',
	style,
	dropdownItems = null,
	value,
	placeholder = '',
	onChange = () => {},
	typeField = 'text',
	readonly = false,
	name = '',
}: IModalField): React.JSX.Element => {
	const [isDrop, setIsDrop] = useState<boolean>(false);
	const [selectValue, setSelectValue] = useState<string>(value ?? placeholder);
	const dropdownSelect = useRef<HTMLInputElement | null>(null);
	const dropdown = (): void => {
		setIsDrop(!isDrop);
	};
	const selectItem = (e: React.MouseEvent<HTMLInputElement>): void => {
		if (dropdownSelect.current === null) return;
		const value = e.currentTarget.value;
		const select = dropdownSelect.current;
		setSelectValue(value);
		select.style.color = '#000';
		onChange(e.currentTarget);
	};
	if (dropdownItems === null) {
		return (
			<input
				name={name}
				type={typeField}
				style={style}
				className={`modal-field ${className}`}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				readOnly={readonly}
			/>
		);
	}
	return (
		<label className='modal-dropdown'>
			<input
				name={name}
				type='button'
				style={style}
				className={`modal-field ${className}`}
				value={selectValue}
				onClick={dropdown}
				onBlur={dropdown}
				ref={dropdownSelect}
			/>
			{isDrop && (
				<div>
					{dropdownItems.map((item, i) => {
						return <input type='button' key={`${item}-${i}`} value={item} onMouseDown={selectItem} />;
					})}
				</div>
			)}
		</label>
	);
};

export default ModalField;
