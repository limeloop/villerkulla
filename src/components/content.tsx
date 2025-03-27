// app/[slug]/page.tsx
'use client'
import parse, { DOMNode, Element } from 'html-react-parser';
import { Form } from './form';

export default function Content({
  html,
  css,
  submissionId,
}: {
  html: string;
  css: string;
  submissionId?: number;
}) {

  // console.log(html)

  const options = {
    replace: (domNode: DOMNode) => {
      // We only care about <form> tags
      console.log(domNode instanceof Element, domNode, domNode instanceof Element ? {tag: domNode.tagName, domNode}: '')
      
      if (
        domNode &&
        typeof domNode === 'object' &&
        (domNode as {type: string}).type === 'tag' &&
        (domNode as {name: string}).name === 'form'
      ) {
        const formId = (domNode as {attribs: { [key: string]: string } }).attribs?.['data-form-id'];
        if (formId) {
          return <Form id={Number(formId)} submissionId={submissionId} />;
        }
      }
      // Otherwise, return undefined to leave other nodes as-is
      return undefined;
    },
  };

  const content = parse(html, options);

  return (
    <>
      <style>{css}</style>
      {content}
    </>
  );
}


