import './quill.sass';

import Quill from 'quill';
import { type Delta, type QuillOptions } from 'quill/core';
import React, { type CSSProperties, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { quillDefaultConfig } from './quill';

interface IBoxQuill {
	content?: Delta;
	quillConfig?: QuillOptions;
	useRetrunContent?: (theory: Delta) => void;
	style?: CSSProperties;
	isReadonly: boolean;
}

const BoxQuill = ({
	content,
	quillConfig,
	useRetrunContent,
	style,
	isReadonly,
}: IBoxQuill): React.ReactNode => {
	const quillRef = useRef<Quill | null>(null);
	const editorRef = useRef<HTMLDivElement | null>(null);
	const [searchParams] = useSearchParams();

	const studieId =
		searchParams.get('studieId') === null ? null : Number(searchParams.get('studieId'));
	useEffect(() => {
		if (editorRef.current === null) return;
		if (quillRef.current === null) {
			if (isReadonly) {
				quillDefaultConfig.modules.toolbar = [];
			}
			quillRef.current = new Quill(
				editorRef.current,
				quillConfig ?? quillDefaultConfig,
			);
			const quill = quillRef.current;
			editorRef.current.style.maxHeight = `${editorRef.current.clientHeight}px`;
			if (isReadonly) {
				quill.disable();
			}
			if (content !== undefined) {
				quill.setContents(content);
			}
			if (useRetrunContent !== undefined && quill !== null) {
				quill.on('text-change', () => {
					useRetrunContent(quill.getContents());
				});
			}
		}
	}, [editorRef, studieId]);
	return <div id='editor' ref={editorRef} style={style}></div>;
};

export default BoxQuill;
