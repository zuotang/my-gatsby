import { createClient } from 'webdav';
function url(path){
	return `/webdav/${path}`
}

const client = createClient('/', {
	username: 'tz',
	password: 'wysj3910'
});

//获取文件夹列表
export async function getDirContents({ path }) {
	let res = await client.getDirectoryContents(url(path));
	return { list: res };
}

//新建文件
export async function addDir(path){
	return await client.createDirectory(path);
}

//arrayBuffer 转 Base64
function transformArrayBufferToBase64 (buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    for (var len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export async function getCover(path){
	console.log(path)
	const buff = await client.getFileContents("/webdav/zuo/IMG_20171003_162205.jpg");
	return 'data:image/jpg;base64,'+transformArrayBufferToBase64(buff)
}

export async function getFileContent({ path }){
	const buff = await client.getFileContents("/webdav/zuo/IMG_20171003_162205.jpg");
	
	return buff
}