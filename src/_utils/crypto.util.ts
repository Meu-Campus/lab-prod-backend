import { createHash } from "crypto";

export class CryptoUtil {
	public static createMd5(param: string): string {
		return createHash("md5").update(param).digest("hex");
	}
}