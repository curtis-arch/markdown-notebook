'use client'

import { useState } from 'react'
import { Modal } from './Modal'
import { Navigation } from './Navigation'
import { ContentViewer } from './ContentViewer'
import { Cart } from './Cart'
import { CartProvider } from '../contexts/CartContext'
import { parseMarkdown, HeadingNode, getContentUntilNextSibling, calculateTotalCounts } from '../utils/markdownParser'

export function MarkdownViewer() {
  const [markdown, setMarkdown] = useState('')
  const [headings, setHeadings] = useState<HeadingNode[]>([])
  const [selectedContent, setSelectedContent] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [activeNode, setActiveNode] = useState<HeadingNode | null>(null)

  const handleMarkdownSubmit = (content: string) => {
    setMarkdown(content)
    setHeadings(parseMarkdown(content))
    setIsModalOpen(false)
  }

  const handleHeadingSelect = (node: HeadingNode) => {
    const content = getContentUntilNextSibling(node, markdown)
    setSelectedContent(content)
    setActiveNode(node)
  }

  const { charCount, byteCount } = activeNode ? calculateTotalCounts(activeNode) : { charCount: 0, byteCount: 0 }

  return (
    <CartProvider>
      <div className="flex h-screen">
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleMarkdownSubmit} />
        <Navigation headings={headings} onHeadingSelect={handleHeadingSelect} activeNode={activeNode} />
        <div className="flex-1 flex flex-col">
          <ContentViewer 
            content={selectedContent} 
            selectedNode={activeNode}
            charCount={charCount}
            byteCount={byteCount}
          />
        </div>
      </div>
    </CartProvider>
  )
}

