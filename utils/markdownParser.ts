export interface HeadingNode {
  title: string
  content: string
  children: HeadingNode[]
  level: number
  startIndex: number
  endIndex: number
  charCount: number
  byteCount: number
}

export function parseMarkdown(markdown: string): HeadingNode[] {
  const lines = markdown.split('\n')
  const root: HeadingNode = { 
    title: 'root', 
    content: '', 
    children: [], 
    level: 0, 
    startIndex: 0, 
    endIndex: lines.length - 1,
    charCount: 0,
    byteCount: 0
  }
  const stack: HeadingNode[] = [root]

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('#')) {
      const level = line.indexOf(' ')
      const title = line.slice(level + 1)

      while (stack.length > 1 && stack[stack.length - 1].level >= level) {
        const node = stack.pop()!
        node.endIndex = i - 1
        updateCounts(node, lines)
      }

      const newNode: HeadingNode = { 
        title, 
        content: '', 
        children: [], 
        level, 
        startIndex: i,
        endIndex: lines.length - 1,
        charCount: 0,
        byteCount: 0
      }
      stack[stack.length - 1].children.push(newNode)
      stack.push(newNode)
    }
  }

  while (stack.length > 1) {
    const node = stack.pop()!
    node.endIndex = lines.length - 1
    updateCounts(node, lines)
  }

  return root.children
}

function updateCounts(node: HeadingNode, lines: string[]) {
  const content = lines.slice(node.startIndex, node.endIndex + 1).join('\n')
  const encoder = new TextEncoder()
  node.charCount = [...content].length
  node.byteCount = encoder.encode(content).length
}

export function getContentUntilNextSibling(node: HeadingNode, fullMarkdown: string): string {
  const lines = fullMarkdown.split('\n')
  return lines.slice(node.startIndex, node.endIndex + 1).join('\n')
}

export function calculateTotalCounts(node: HeadingNode): { charCount: number, byteCount: number } {
  let totalCharCount = node.charCount
  let totalByteCount = node.byteCount

  for (const child of node.children) {
    const childCounts = calculateTotalCounts(child)
    totalCharCount += childCounts.charCount
    totalByteCount += childCounts.byteCount
  }

  return { charCount: totalCharCount, byteCount: totalByteCount }
}

