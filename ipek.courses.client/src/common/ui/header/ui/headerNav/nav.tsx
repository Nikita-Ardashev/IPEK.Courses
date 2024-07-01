import React from 'react';

interface IHeaderNav {
	img: string;
	text: string;
	onclick?: (e: React.MouseEvent) => void;
}

const HeaderNav = ({ img, text, onclick }: IHeaderNav): React.JSX.Element => {
	return (
		<button onClick={onclick}>
			<img src={img} alt='' />
			<p>{text}</p>
		</button>
	);
};

export default HeaderNav;
