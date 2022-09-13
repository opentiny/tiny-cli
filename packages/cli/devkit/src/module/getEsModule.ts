export default (fn: any) => {
	if (!fn) {
		return;
	}
	return fn.default || fn;
};
