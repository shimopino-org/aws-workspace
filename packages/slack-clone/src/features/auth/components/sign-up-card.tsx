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

interface SignUpCardProps {
	setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
	const { signIn } = useAuthActions();

	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setIsLoading(true);
		signIn("password", { email, password, flow: "signUp" })
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
		<Card className="w-full h-hull p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Create your account</CardTitle>
				<CardDescription>
					Use your email or another service to continue
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-5 px-0 pb-0">
				{!!error && (
					<div className="bg-destructive/15 text-destructive p-3 flex items-center gap-x-2 text-sm rounded-md">
						<TriangleAlert className="size-4" />
						<p>{error}</p>
					</div>
				)}
				<form onSubmit={onPasswordSignUp} className="space-y-2.5">
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
					<Input
						disabled={isLoading}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
						placeholder="Confirm Password"
						required
					/>
					<Button
						disabled={isLoading}
						className="w-full"
						size="default"
						type="submit"
					>
						Continue
					</Button>
				</form>
				<Separator />
				<Button
					disabled={isLoading}
					onClick={() => handleSignIn("google")}
					className="w-full relative"
					variant="outline"
				>
					<FcGoogle className="absolute top-3 left-3" />
					Continue with Google
				</Button>
				<Button
					disabled={isLoading}
					onClick={() => handleSignIn("github")}
					className="w-full relative"
					variant="outline"
				>
					<FaGithub className="absolute top-3 left-3" />
					Continue with GitHub
				</Button>
				<div className="text-xs text-muted-foreground">
					Already have an account?{" "}
					<span
						onClick={() => setState("signIn")}
						onKeyUp={(e) => {
							if (e.key === "Enter") setState("signIn");
						}}
						className="text-sky-700 hover:underline hover:cursor-pointer"
					>
						Sign in
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
