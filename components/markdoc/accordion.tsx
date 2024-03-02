import { useId } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function MarkdocAccordion({
  children,
  type = "single",
  collapsible = false,
}: {
  children: any
  type: "single" | "multiple"
  collapsible: boolean
}) {
  return <Accordion type={type}>{children}</Accordion>
}

export function MarkdocAccordionItem({
  title,
  children,
}: {
  children: any
  title: string
}) {
  const id = useId()
  return (
    <AccordionItem value={id}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  )
}
