import './field.sass';

import { observer } from 'mobx-react-lite';
import React, {
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
	useEffect,
	useState,
} from 'react';

import Dropdown from '@/common/ui/dropdown/dropdown';

interface IModalFieldDropdown {
	items: string[];
}
interface IModalField {
	className?: string;
	style?: Record<string, string>;
	dropdown?: IModalFieldDropdown;
	value?: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement> | HTMLInputElement) => void;
	typeField?: HTMLInputTypeAttribute;
	readonly?: boolean;
	name?: string;
}

const ModalField = observer(
	({
		className = '',
		style,
		dropdown,
		value = '',
		placeholder,
		onChange = () => {},
		typeField = 'text',
		readonly = false,
		name,
	}: IModalField): React.JSX.Element => {
		const [selectValue, setSelectValue] = useState<string>(value);
		useEffect(() => {
			setSelectValue(value);
		}, [value]);
		const inputAttr: InputHTMLAttributes<HTMLInputElement> = {
			name: name,
			type: typeField,
			style: style,
			className: `modal-field ${className}`,
			placeholder: placeholder,
			readOnly: readonly,
		};

		const inpOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(e);
			setSelectValue(e.target.value);
		};

		if (dropdown === undefined) {
			return <input {...inputAttr} value={selectValue} onChange={inpOnChange} />;
		}
		return (
			<Dropdown
				className={`modal-dropdown ${className}`}
				list={dropdown.items}
				setCurrent={setSelectValue}
				defaultCurrent={placeholder}
				onlyCurrent={readonly}
				onChange={onChange}
				name={name}
			/>
		);
	},
);

export default ModalField;
