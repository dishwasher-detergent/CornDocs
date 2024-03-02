export interface Node {
  name: string
  attributes: { [key: string]: any }
  children?: Node[]
}
