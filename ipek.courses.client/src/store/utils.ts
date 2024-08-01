import { languages } from 'monaco-editor';

import { langToolModel } from './models/utils';

export const langTool = langToolModel.create({ langs: languages.getLanguages() });
