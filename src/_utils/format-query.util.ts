export function formatQueryUtil(query: any) {
	if (query.search) {
		query["$or"] = [
			{ $text: { $search: query.search } }];
		delete query.search;
	}
	return query;
}