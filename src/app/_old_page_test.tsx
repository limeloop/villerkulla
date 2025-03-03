import {ParticipantForm} from "@/components/testForm";
import Link from "next/link";

export default function Page() {

  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h3 className="text-2xl font-bold text-center sm:text-left mb-3">Welcome to your Next.js project</h3>
        <h4 className="text-2xl font-bold text-center sm:text-left">{projectId}</h4>
        
        <ul>
          <li><Link href="/">Hem</Link></li>
          <li><Link href="/test-sida-2">Test sida 2</Link></li>
          <li><Link href="/test-sida-1">Test sida 1</Link></li>
        </ul>

        <ParticipantForm projectId={projectId!} />
      
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}