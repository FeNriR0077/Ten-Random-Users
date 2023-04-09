const url = "https://randomuser.me/api/?results=10";

const fetchUsers = async (abortController) => {
	const request = await fetch(url, {
		signal: abortController.signal,
	});
	const results = await request.json();
	return results;
};

export default fetchUsers;
