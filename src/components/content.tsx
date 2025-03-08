// app/[slug]/page.tsx
'use client'
import parse, { DOMNode, Element } from 'html-react-parser';
import { Form } from './form';

export default function Content({
  html,
  css,
  submissionId,
}: {
  html: any;
  css: any;
  submissionId?: any;
}) {

  const options = {
    replace: (domNode: DOMNode) => {
      // We only care about <form> tags
      if (domNode instanceof Element && domNode.tagName === 'form') {
        //Check if there is a data-form-id="something" attribute
        const formId = domNode.attribs?.['data-form-id'];

        if (formId) {
          // Return your React <Form> component instead of the original <form> node
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


