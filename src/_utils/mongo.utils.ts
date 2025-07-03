import { ObjectId } from "mongodb";

export class MongoUtils {
	public static convertObjetId(id: string | Id) {
		return new ObjectId(String(id));
	}
}