import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { chunkList } from '../../utils/public';

const sortObj = [ { name: 'date', label: '时间' }, { name: 'name', label: '名称' }, { name: 'size', label: '大小' } ];

//排序文件
export function useFileSort(list, columnLen) {
	//排序方式
	const [ sortIndex, setSortIndex ] = useState(0);
	//文件列表数据
	const [ gridList, setGridList ] = useState([]);
	useEffect(
		() => {
			if (list) {
				let dirList = list ? list.slice(1) : [];
				//文件排序处理
				dirList.sort(function(a, b) {
					let sortName = sortObj[sortIndex].name;
					if (sortName === 'date') {
						let aCondition = new Date(a.lastmod);
						let bCondition = new Date(b.lastmod);
						return aCondition < bCondition ? 1 : -1;
					} else if (sortName === 'name') {
						var nameA = a.basename.toUpperCase(); // ignore upper and lowercase
						var nameB = b.basename.toUpperCase(); // ignore upper and lowercase
						return nameA < nameB ? -1 : 1;
					} else if (sortName === 'size') {
						let aCondition = +a.size;
						let bCondition = +b.size;
						return aCondition < bCondition ? -1 : 1;
					}
				});
				setGridList(chunkList(dirList, columnLen));
			}
		},
		[ list, sortIndex ]
	);
	return { gridList, sortIndex, setSortIndex, sort: sortObj[sortIndex], sortObj };
}

export default function SortBtn({ sortIndex, sortObj, setSortIndex }) {
	return (
		<Button
			onClick={(e) => {
				let next = (sortIndex + 1) % sortObj.length;
				setSortIndex(next);
			}}
		>
			{sortObj[sortIndex].label}
		</Button>
	);
}
