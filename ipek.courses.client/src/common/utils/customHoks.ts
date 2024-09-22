import { useEffect, useState } from 'react';

interface ICheckReponseData<T> {
	result: T | null;
	error: Error | null;
	loading: boolean;
}

interface IUseCheckResponese<T> {
	fetch: () => Promise<void>;
	data: ICheckReponseData<T>;
}

export const useFetch = <T>(promise: () => Promise<T>): IUseCheckResponese<T> => {
	const [data, setData] = useState<ICheckReponseData<T>>({
		result: null,
		error: null,
		loading: false,
	});

	const fetch = async () => {
		setData((v) => {
			const newV = { ...v, loading: true };
			return newV;
		});
		const r = await promise();
		try {
			setData((v) => {
				const newV = { ...v, result: r, loading: false };
				return newV;
			});
		} catch (e) {
			setData((v) => {
				const newV = { ...v, error: e as Error, loading: false };
				return newV;
			});
			throw new Error(e);
		} finally {
			setData((v) => {
				const newV = { ...v, loading: false };
				return newV;
			});
		}
	};

	return { fetch, data };
};
