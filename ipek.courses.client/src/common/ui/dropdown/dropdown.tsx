import './dropdown.sass';

import { iconSearch } from '@assets/assets';
import { iconGreyArrow } from '@assets/assets';
import { observer } from 'mobx-react-lite';
import React, { CSSProperties, Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IDropdown {
	list: string[];
	defaultCurrent?: string;
	onlyCurrent?: boolean;
	className?: string;
	style?: CSSProperties;
	setCurrent: Dispatch<SetStateAction<string>>;
	onChange?: (input: HTMLInputElement) => void;
	name?: string;
}

const Dropdown = observer(
	({
		className,
		list,
		onlyCurrent,
		style,
		defaultCurrent = '',
		setCurrent,
		onChange,
		name,
	}: IDropdown) => {
		const [select, setSelect] = useState<string>(defaultCurrent);
		const [dropdown, setDropdown] = useState<string[]>(list);
		useEffect(() => {
			setDropdown(list);
		}, [list]);
		const selecting = (e: React.MouseEvent<HTMLInputElement>): void => {
			const t = (e.currentTarget.value ?? '').trim();
			if (t === null) return;
			setSelect(t);
			setCurrent(t.toLowerCase());
			onChange && onChange(e.currentTarget);
		};
		const searchLang = (e: React.ChangeEvent<HTMLInputElement>): void => {
			const filterList = list.filter((item) => {
				if (item === null || item === undefined) return;
				return item
					.trim()
					.toLowerCase()
					.includes(e.currentTarget.value.trim().toLowerCase());
			});
			setDropdown(filterList);
		};
		return (
			<div className={'dropdown ' + (className ?? '')} style={style}>
				<button>
					<p>{select}</p>
					{!onlyCurrent && <img src={iconGreyArrow} alt='' />}
				</button>
				{!onlyCurrent && (
					<div>
						<label>
							<input
								maxLength={20}
								type='text'
								placeholder='Поиск'
								onChange={searchLang}
							/>
							<img src={iconSearch} alt='' />
						</label>
						{dropdown.map((l, i) => {
							return (
								<input
									key={l + i}
									id={l}
									type='button'
									onClick={selecting}
									name={name}
									defaultValue={l}
								/>
							);
						})}
					</div>
				)}
			</div>
		);
	},
);

export default Dropdown;
