import { type CellObject, type ExcelDataType, read, type WorkSheet } from 'xlsx';

export const parsingColumnList = (workbook: WorkSheet, columnName: string): { title: string; column: string[] } => {
	let columnLetter: string = '';
	for (const key in workbook) {
		const k: CellObject = workbook[key];
		if (k.v === undefined) continue;
		if (String(k.v).includes(columnName)) {
			columnLetter = key;
			break;
		}
	}
	const char = columnLetter.substring(0, 1);
	let startIndex = Number(columnLetter.substring(1));
	const column: string[] = [];
	Object.keys(workbook).filter((c): null => {
		const chr = c.substring(0, 1);
		if (chr === char) {
			column.push(workbook[`${char}${startIndex}`].v);
			startIndex++;
		}
		return null;
	});
	const title = column.shift() ?? '';
	return { title, column };
};

export const getCell = (workbook: WorkSheet | ExcelDataType, cell: string): string => {
	const k = cell.toUpperCase().trim();
	const i = Object.keys(workbook).findIndex((r) => r === k);
	return Object.values(workbook)[i].v;
};

export const parsingAddedListGroup = (data: Uint8Array): { column: string[]; title: string } => {
	const d = new Uint8Array(data);
	const workbook = Object.values(Object.values(read(d, { type: 'array' }))[2])[0] as WorkSheet;
	const { column } = parsingColumnList(workbook, 'ФИО');
	const title = getCell(workbook, 'C3');
	return { column, title };
};
