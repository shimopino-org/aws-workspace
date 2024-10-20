import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="text-rose-500 font-bold text-2xl">
			Hello World
			<Button variant="slack" size="lg">
				Click me
			</Button>
		</div>
	);
}
