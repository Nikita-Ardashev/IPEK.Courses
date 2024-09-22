import './field.sass';

import iconArrow from '@img/greyArrow.svg';
import iconSearch from '@img/search.svg';
import React, { HTMLInputTypeAttribute, useRef, useState } from 'react';

import Dropdown from '@/common/ui/dropdown/dropdown';
interface IModalField {
	className?: string;
	style?: Record<string, string>;
	dropdownItems?: string[] | null;
	value?: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement> | HTMLInputElement) => void;
	typeField?: HTMLInputTypeAttribute;
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
	const inputAttr = {
		name: name,
		type: typeField,
		style: style,
		className: `modal-field ${className}`,
		value: value,
		placeholder: placeholder,
		readOnly: readonly,
	};
	const [selectValue, setSelectValue] = useState<string>('');

	if (dropdownItems === null) {
		return <input {...inputAttr} onChange={onChange} />;
	}
	return (
		<Dropdown
			className='modal-dropdown'
			list={dropdownItems}
			setCurrent={setSelectValue}
			defaultCurrent='Группа'
		/>
	);
};

export default ModalField;
