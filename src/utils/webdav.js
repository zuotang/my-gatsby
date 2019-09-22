import { createClient } from 'webdav';

const client = createClient('/', {
	username: 'tz',
	password: 'wysj3910'
});

export async function getDirContents({ path }) {
	let res = await client.getDirectoryContents(`/webdav/${path}`);
	return { list: res };
}
