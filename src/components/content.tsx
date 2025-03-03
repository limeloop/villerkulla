// app/[slug]/page.tsx
'use client'
import parse, { DOMNode } from 'html-react-parser';
import { Form } from './form';


export default function Content({ html, css }: { html: any, css: any} ) {

const options = {
    replace: (domNode: DOMNode) => {
      // If we see a comment node with the placeholder, return <MyForm/>
      const data = (domNode as any)?.data?.trim(); // Using 'as any' or @ts-ignore if needed
        if (data && data.startsWith('[application_form id=')) {
        // Use a regex to match id="some_value"
        const match = data.match(/id="([^"]+)"/);
        if (match && match[1]) {
            const formId = match[1]; // e.g. "3"
            return <Form id={formId} />;
        }
        }
      // Return undefined for everything else, so it's left as-is
      return undefined;
    },
  };

  const content = parse(html, options);

  return (
    <>
       <style>
          {css}
        </style>
        {content}
    </>
  );
}


