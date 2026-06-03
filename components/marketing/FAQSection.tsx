import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Do you provide Certificate of Analysis (COA)?",
    answer: "Yes, we provide a Certificate of Analysis (COA) for every batch of product exported. We also provide Material Safety Data Sheets (MSDS) and Phytosanitary Certificates where required."
  },
  {
    question: "What are your standard Incoterms?",
    answer: "We typically work with EXW (Ex Works), FOB (Free on Board) Tema Port, and CIF (Cost, Insurance, and Freight) depending on client preference."
  },
  {
    question: "What is your Minimum Order Quantity (MOQ)?",
    answer: "Our MOQs vary by product but generally start at 100kg for air freight and 1 ton for sea freight. We are flexible for trial orders."
  },
  {
    question: "Do you offer private labeling?",
    answer: "Yes, we can arrange for custom packaging and private labeling for bulk orders. Please discuss your requirements with our export team."
  },
  {
    question: "What is the lead time for orders?",
    answer: "Standard lead time is 7-14 days for preparation and documentation, plus shipping time. This may vary based on order volume and packaging requirements."
  }
]

export function FAQSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-lg font-medium text-slate-900">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}





