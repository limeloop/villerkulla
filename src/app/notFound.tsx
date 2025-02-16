import Link from 'next/link'
 
export default function NotFound() {
    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

  return (
    <div>
      <h2>Not Found</h2>
      <h4 className="text-2xl font-bold text-center sm:text-left">{projectId}</h4>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}