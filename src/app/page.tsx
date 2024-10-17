import { connectDB } from "@/lib/moogose";

export default async function Home() {
  const conncect = await connectDB();

  
  return <main>Home Page</main>;
}
