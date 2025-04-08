import { redirect } from "next/navigation";

export default function Page() {
  // Automatically redirect to the sign in page when the application starts
  redirect("/signin");
  return null;
}
