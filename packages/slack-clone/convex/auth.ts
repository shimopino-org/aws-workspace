import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import type { DataModel } from "./_generated/dataModel";

const CustomPassword = Password<DataModel>({
	profile(params) {
		// `const { signIn } = useAuthActions();` の関数を呼び出した際に指定した引数が渡ってきます。
		console.log(params);
		return {
			email: params.email as string,
			name: params.name as string,
		};
	},
});

export const { auth, signIn, signOut, store } = convexAuth({
	providers: [GitHub, Google, CustomPassword],
});
