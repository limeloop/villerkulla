// app/[slug]/page.tsx
'use client'
import { Page } from '@/types';
import Link from 'next/link';


export default function PagesDebug({
  pages,

}: {
    pages: Page[];
}) {
 
  return (
    <>
    <ul>
     {pages.map((page: {id: number, slug: string}, index) => (
        <li key={page.id}><Link href={`/${page.slug}`}>{page.slug}</Link></li>
     ))}
     </ul>
    </>
  );
}


