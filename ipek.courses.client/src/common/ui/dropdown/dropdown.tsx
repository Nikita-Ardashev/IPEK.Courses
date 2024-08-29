import './dropdown.sass';

import iconArrow from '@img/greyArrow.svg';
import iconSearch from '@img/search.svg';
import React, { CSSProperties, Dispatch, SetStateAction, useState } from 'react';

interface IDropdown {
	list: string[];
	defaultCurrent?: string;
	onlyCurrent?: boolean;
	className?: string;
	style?: CSSProperties;
	setCurrent: Dispatch<SetStateAction<string>>;
}

const Dropdown = ({
	className,
	list,
	onlyCurrent,
	style,
	defaultCurrent = '',
	setCurrent,
}: IDropdown) => {
	const [select, setSelect] = useState<string>(defaultCurrent);
	const [dropdown, setDropdown] = useState<string[]>(list);
	const selecting = (e: React.MouseEvent<HTMLSpanElement>): void => {
		const t = (e.currentTarget.textContent ?? '').trim();
		if (t === null) return;
		setSelect(t);
		setCurrent(t.toLowerCase());
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
				{!onlyCurrent && <img src={iconArrow} alt='' />}
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
							<span key={l + i} id={l} onClick={selecting}>
								{l}
							</span>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
