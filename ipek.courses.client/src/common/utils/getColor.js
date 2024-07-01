import ColorThief from 'colorthief';

const colorThief = new ColorThief();

const getColorRGBFromArr = (colors) => {
	const length = colors.length - 1;
	return `RGB(${colors[0]}, ${colors[1]}, ${colors[2]}${length === 3 ? ', ' + colors[3] : ''})`;
};

const getColor = (img) => {
	const colors = colorThief.getColor(img);
	return getColorRGBFromArr(colors);
};

const getPalette = (img) => {
	const colors = colorThief.getPalette(img);
	const colorsRGB = [];
	for (const color of colors) {
		colorsRGB.push(getColorRGBFromArr(color));
	}
	return colorsRGB;
};

export { getColor, getColorRGBFromArr, getPalette };
