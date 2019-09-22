//一维数组转二维
export function chunkList(baseArray, n) {
	if (!baseArray) return;
	//获取要切割的数组的长度
	let len = baseArray.length;
	let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
	let res = [];
	for (let i = 0; i < lineNum; i++) {
		let temp = baseArray.slice(i * n, i * n + n);
		res.push(temp);
	}
	return res;
}
