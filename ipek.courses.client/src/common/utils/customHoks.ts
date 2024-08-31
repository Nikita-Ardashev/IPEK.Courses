import { useEffect, useState } from 'react';

interface ICheckReponseData<T> {
	result: T | null;
	error: Error | null;
	loading: boolean;
}

export const useCheckReponse = <T>(promise: () => Promise<T>): ICheckReponseData<T> => {
	const [data, setData] = useState<ICheckReponseData<T>>({
		result: null,
		error: null,
		loading: false,
	});
	useEffect(() => {
		setData((v) => {
			const newV = { ...v, loading: true };
			return newV;
		});
		try {
			promise().then((r) => {
				setData((v) => {
					const newV = { ...v, loading: false, result: r };
					return newV;
				});
			});
		} catch (e) {
			setData((v) => {
				const newV = { ...v, loading: false, error: e as Error };
				return newV;
			});
			throw new Error(e);
		}
	}, [promise]);

	return data;
};
