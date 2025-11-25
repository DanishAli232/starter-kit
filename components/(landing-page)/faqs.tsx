// components/sections/FAQ.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Is this starter kit free?",
    answer:
      "Yes! It is built on open source libraries. You can use it for personal and commercial projects.",
  },
  {
    question: "Can I use this with other frameworks?",
    answer:
      "This kit is specifically designed for Next.js 14/15 using Tailwind CSS and shadcn/ui.",
  },
  {
    question: "How do I update the components?",
    answer:
      "Since shadcn isn't a library you download, you own the code. You can update by copy-pasting new code or using the shadcn CLI diff command.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-muted/50">
      <div className="container max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
