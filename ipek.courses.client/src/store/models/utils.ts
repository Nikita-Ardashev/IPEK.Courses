import { flow, Instance, types } from 'mobx-state-tree';

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

export const stateType = types.enumeration(['loading', 'done', 'error', 'notStarted']);

export const fetchModel = types
	.model({
		error: types.maybe(types.string),
		state: types.optional(stateType, 'notStarted'),
	})
	.actions((self) => ({
		setState(state: Instance<typeof self.state>) {
			self.state = state;
		},
		setError(error: Instance<typeof self.error>) {
			self.error = error;
		},
		reset() {
			self.state = 'notStarted';
			self.error = undefined;
		},
	}));

export const fetchActionsModel = types
	.model({})
	.volatile(() => ({
		fethes: {} as { [key: string]: typeof fetchModel.Type },
	}))
	.actions((self) => ({
		addResource(name: string) {
			self.fethes[name] = fetchModel.create({});
		},
		setState(resource: string, state: Instance<typeof stateType>) {
			self.fethes[resource].setState(state);
		},
		setError(resource: string, error: string) {
			self.fethes[resource].setError(error);
		},
		reset(resource: string) {
			self.fethes[resource].reset();
		},
	}))
	.actions((self) => ({
		fetchData: flow(function* (resource: string, apiCall: () => Promise<any>) {
			if (!(resource in self.fethes)) {
				self.addResource(resource);
			}
			self.setState(resource, 'loading');
			try {
				const data = yield apiCall();
				self.setState(resource, 'done');
				return data;
			} catch (e) {
				self.setError(resource, e.toString());
				self.setState(resource, 'error');
				throw new Error(e);
			}
		}),
	}))
	.views((self) => ({
		get getStates() {
			return self;
		},
		getFetch() {},
	}));
