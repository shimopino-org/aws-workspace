import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import type { SignInFlow } from "../types";

interface SignInCardProps {
	setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
	const { signIn } = useAuthActions();

	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsLoading(true);
		signIn("password", { email, password, flow: "signIn" })
			.catch(() => {
				setError("Something is wrong");
			})
			.finally(() => setIsLoading(false));
	};

	const handleSignIn = (value: "github" | "google") => {
		setIsLoading(true);
		signIn(value).finally(() => setIsLoading(false));
	};

	return (
		<Card className="w-full h-full p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Login to continue</CardTitle>
				<CardDescription>
					Use your email or another service to continue
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-5 px-0 pb-0">
				{!!error && (
					<div className="text-destructive flex items-center gap-x-2 bg-destructive/15 p-3 rounded-md text-sm">
						<TriangleAlert className="size-4" />
						<p>{error}</p>
					</div>
				)}
				<form onSubmit={onPasswordSignIn} className="space-y-2.5">
					<Input
						disabled={isLoading}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
						required
					/>
					<Input
						disabled={isLoading}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
						required
					/>
					<Button
						type="submit"
						className="w-full"
						disabled={isLoading}
						size="default"
					>
						Continue
					</Button>
				</form>
				<Separator />
				<Button
					disabled={isLoading}
					onClick={() => handleSignIn("google")}
					variant="outline"
					className="w-full relative"
				>
					<FcGoogle className="absolute top-3 left-3" />
					Continue with Google
				</Button>
				<Button
					disabled={isLoading}
					onClick={() => handleSignIn("github")}
					variant="outline"
					className="w-full relative"
				>
					<FaGithub className="absolute top-3 left-3" />
					Continue with GitHub
				</Button>
				<div className="text-xs text-muted-foreground">
					Don&apos;t have an account?{" "}
					<span
						onClick={() => setState("signUp")}
						onKeyUp={(e) => {
							if (e.key === "Enter") setState("signUp");
						}}
						className="text-sky-700 hover:underline hover:cursor-pointer"
					>
						Sign Up
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
