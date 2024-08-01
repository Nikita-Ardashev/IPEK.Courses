import { types } from 'mobx-state-tree';

export const langModel = types.model({
	id: types.string,
	extensions: types.array(types.string),
	aliases: types.array(types.string),
	mimetypes: types.array(types.string),
});

export const langToolModel = types
	.model({
		langs: types.array(langModel),
	})
	.views((self) => {
		return {
			get getLangs() {
				return self.langs;
			},
			get getLangNames() {
				const langNames = self.langs.map((l) => l.aliases[0]);
				return langNames;
			},
		};
	})
	.actions((self) => ({
		setLangs(newLangs: typeof self.langs) {
			self.langs = newLangs;
		},
	}));
