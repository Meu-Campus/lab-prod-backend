export class DateUtil {
	public static getCurrentTimeString(): string {
		return new Date().getTime().toString();
	}

	public static getPtBrDateString(date: Date): string {
		return date.toLocaleDateString("pt-BR");
	}

	public static formatToPtBrDate(date: Date): Date {
		const newDate = new Date(date);
		newDate.setHours(newDate.getHours() - 3);
		return newDate;
	}

	public static getWeekRange(date: Date) {
		const dayOfWeek = date.getDay();

		const startOfWeek = new Date(date);
		startOfWeek.setDate(date.getDate() - dayOfWeek + 1);

		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 6);

		startOfWeek.setHours(0, 0, 0, 0);
		endOfWeek.setHours(23, 59, 59, 999);

		return {
			startOfWeek,
			endOfWeek
		};
	}
}