import npm from '../npm/index';
/**
 * 线上模块是否存在
 */
async function onlineExist(name: string): Promise<boolean> {
	const latest = await npm.latest(name);
	// 如果description 为 delete的话，则排查掉该模块，因为publish 之后，是不允许unpublish的
	return !!(latest && latest.description !== 'delete');
}

export default onlineExist;
