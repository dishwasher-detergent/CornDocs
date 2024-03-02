import { Node } from "@/interfaces/node.interface"
import { slugifyWithCounter } from "@sindresorhus/slugify"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNodeText(node: Node) {
  let text = ""
  for (let child of node.children ?? []) {
    if (typeof child === "string") {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

export function collectHeadings(nodes: Node[], slugify = slugifyWithCounter()) {
  let sections: any[] = []

  for (let node of nodes) {
    if (node.name === "Heading") {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.attributes.level > 2) {
          if (!sections[sections.length - 1]) {
            throw new Error(
              `Cannot add 'h${
                node.attributes.level
              }' to table of contents without a preceding 'h${
                node.attributes.level - 1
              }'`
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}
