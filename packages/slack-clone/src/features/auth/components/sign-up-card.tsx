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
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import type { SignInFlow } from "../types";

interface SignUpCardProps {
	setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<Card className="w-full h-hull p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Create your account</CardTitle>
				<CardDescription>
					Use your email or another service to continue
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-5 px-0 pb-0">
				<form className="space-y-2.5">
					<Input
						disabled={false}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
						required
					/>
					<Input
						disabled={false}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
						required
					/>
					<Input
						disabled={false}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
						placeholder="Confirm Password"
						required
					/>
					<Button
						disabled={false}
						className="w-full"
						size="default"
						type="submit"
					>
						Continue
					</Button>
				</form>
				<Separator />
				<Button
					disabled={false}
					onClick={() => {}}
					className="w-full relative"
					variant="outline"
				>
					<FcGoogle className="absolute top-3 left-3" />
					Continue with Google
				</Button>
				<Button
					disabled={false}
					onClick={() => {}}
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
