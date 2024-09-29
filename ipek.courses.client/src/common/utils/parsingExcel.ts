import { type CellObject, read, type WorkSheet } from 'xlsx';

export const formingWorkbook = (file: Uint8Array): WorkSheet => {
	return Object.values(
		Object.values(read(new Uint8Array(file), { type: 'array' }))[2],
	)[0] as WorkSheet;
};

interface IColumnList {
	title: string;
	column: string[];
}

export const parsingColumnList = (file: Uint8Array, columnName: string): IColumnList => {
	const workbook = formingWorkbook(file);
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
			try {
				column.push(workbook[`${char}${startIndex}`].v);
				startIndex++;
			} catch {
				return null;
			}
		}
		return null;
	});
	const title = column.shift() ?? '';
	return { title, column };
};

export const getCell = (file: Uint8Array, cell: string): string => {
	const workbook = formingWorkbook(file);
	const k = cell.toUpperCase().trim();
	const i = Object.keys(workbook).findIndex((r) => r === k);
	return Object.values(workbook)[i].v;
};

export interface IParsingAddedListGroup<T extends string> {
	students: Record<T, string>[];
	title: string;
}

function transformData(data: Record<string, IColumnList>): Record<string, string>[] {
	const keys = Object.keys(data);
	const numberOfEntries = data[keys[0]].column.length;
	const transformedArray: Record<string, string>[] = [];

	for (let i = 0; i < numberOfEntries; i++) {
		const entry: Record<string, string> = {};

		keys.forEach((key) => {
			entry[key] = data[key].column[i];
		});

		transformedArray.push(entry);
	}

	return transformedArray;
}

export const parsingAddedListGroup = <T extends string>(
	file: Uint8Array,
	choiceColumn: { search: string; name: T }[],
	choiceCellTitle: string = 'C3',
): IParsingAddedListGroup<T> => {
	const columns: Record<string, IColumnList> = {};
	choiceColumn.forEach((c) => {
		columns[c.name] = parsingColumnList(file, c.search);
	});
	const students = transformData(columns);
	const title = getCell(file, choiceCellTitle);
	return { students, title };
};
