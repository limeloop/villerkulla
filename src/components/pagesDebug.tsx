// app/[slug]/page.tsx
'use client'
import parse, { DOMNode } from 'html-react-parser';
import { Form } from './form';
import Link from 'next/link';


export default function PagesDebug({
  pages,

}: {
    pages: any;

}) {
 
  return (
    <>
    <ul>
     {pages.map((page: any) => (
        <li key={page.id}><Link href={`/${page.slug}`}>{page.slug}</Link></li>
     ))}
     </ul>
    </>
  );
}


