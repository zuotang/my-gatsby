import { useState, useEffect } from 'react';

function handleOption(opt) {
	let newList = [];
	function work(opt) {
		if (Array.isArray(opt)) {
			opt.forEach(work);
		} else if (opt instanceof Object) {
			Object.values(opt).forEach(work);
		} else {
			newList.push(opt);
		}
	}
	work(opt);
	return newList;
}

function useBaseFetch(ql) {
	let [ data, setData ] = useState({});
	let [ loading, setLoading ] = useState(true);
	let [ error, setError ] = useState(null);

	async function fetch({ params, onError, onSuccess, updateQuery, title = '请求' }) {
		// 初始数据
		setLoading(true);
		//setData({});
		setError(null);
		let res = await ql(params).catch(function(error) {
			setLoading(false);
			setError(error.message);
			onError && onError({ type: 'error', message: `${error.message || error.msg}` });
			throw error;
		});
		onSuccess && onSuccess({ type: 'success', message: `${title}成功` }, res);
		setLoading(false);

		if (updateQuery) {
			res = updateQuery(data, res, params);
		}

		setData(res);
		return res;
	}
	return { fetch, data, loading, error, setError };
}
export function useQuery(ql) {
	return useBaseFetch(ql);
}

export function useAutoQuery(ql, { title, onSuccess, onError, hold, ...params }) {
	let context = useBaseFetch(ql);
	useEffect(() => {
		//是否等待
		if (!hold) {
			context.fetch({ params, title, onSuccess, onError });
		}
	}, handleOption(params));
	return {
		...context,
		fetchMore: (newParams, updateQuery) => {
			context.fetch({ params: Object.assign({}, params, newParams), title, onSuccess, onError, updateQuery });
		},
		update: () => {
			context.fetch({ params, title, onSuccess, onError });
		}
	};
}
