import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <SignIn routing="path" path="/login" signUpUrl="/login" />
    </div>
  );
}
