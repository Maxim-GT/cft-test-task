export function declineRuSeconds(number: number, wodrds: [string, string, string]): string {
	const cases = [2, 0, 1, 1, 1, 2];

	return wodrds[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}