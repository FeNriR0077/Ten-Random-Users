const url = import.meta.env.VITE_URL;

const fetchUsers = async (abortController) => {
	const request = await fetch(url, {
		signal: abortController.signal,
	});
	const results = await request.json();
	return results;
};

export default fetchUsers;
