import './dragLine.sass';

import iconDragline from '@img/constructor/drag.svg';
import React, { type ReactNode, type RefObject, useEffect, useRef } from 'react';

interface IDragLine {
	boxParentRef: RefObject<HTMLDivElement | null>;
	boxRightRef: RefObject<HTMLDivElement | null>;
	boxLeftRef: RefObject<HTMLDivElement | null>;
}

export const DragLine = ({ boxLeftRef, boxRightRef, boxParentRef }: IDragLine): ReactNode => {
	const dragLineRef = useRef<HTMLButtonElement | null>(null);
	useEffect(() => {
		const bLeft = boxLeftRef.current;
		const bRight = boxRightRef.current;
		const bParent = boxParentRef.current;
		const dr = dragLineRef.current;
		const html = document.querySelector('html');
		if (bLeft === null || bRight === null || html === null || bParent === null || dr === null) return;
		let minSizeInPercent = 20;
		let wConstructor = bParent.getBoundingClientRect().width;
		const startDrag = (): void => {
			html.style.cursor = 'grabbing';
			window.onmousemove = moveDrag;
			minSizeInPercent = window.innerWidth > 1000 ? 20 : 40;
			wConstructor = bParent.getBoundingClientRect().width;
		};
		const moveDrag = (e: MouseEvent): void => {
			const { clientX } = e;
			const padding = (window.innerWidth - wConstructor) / 2;
			const percentLeft = Math.round(Math.abs((clientX - padding) / wConstructor) * 10000) / 100;
			if (minSizeInPercent > percentLeft) {
				bLeft.style.width = minSizeInPercent + '%';
				return;
			}
			if (minSizeInPercent > 100 - percentLeft) {
				bRight.style.width = minSizeInPercent + '%';
				return;
			}
			bLeft.style.width = percentLeft + '%';
			bRight.style.width = 100 - percentLeft + '%';
		};
		const endDrag = (): void => {
			html.style.cursor = 'auto';
			window.onmousemove = null;
		};
		dr.onmousedown = startDrag;
		window.onmouseup = endDrag;
	}, [boxLeftRef, boxRightRef, boxParentRef]);
	return (
		<button type='button' className='constructor-dragline' ref={dragLineRef}>
			<img src={iconDragline} alt='' />
		</button>
	);
};
