'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, CircleDot } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { HeadingNode, calculateTotalCounts } from '../utils/markdownParser'
import { useCart } from '../contexts/CartContext'

interface NavigationProps {
  headings: HeadingNode[]
  onHeadingSelect: (node: HeadingNode) => void
  activeNode: HeadingNode | null
}

export function Navigation({ headings, onHeadingSelect, activeNode }: NavigationProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const { cartItems } = useCart()

  const toggleExpand = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newExpandedNodes = new Set(expandedNodes)
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId)
    } else {
      newExpandedNodes.add(nodeId)
    }
    setExpandedNodes(newExpandedNodes)
  }

  const renderHeadings = (nodes: HeadingNode[], level = 0) => {
    return nodes.map((node, index) => {
      const nodeId = `${level}-${index}`
      const isExpanded = expandedNodes.has(nodeId)
      const hasChildren = node.children && node.children.length > 0
      const isActive = node === activeNode
      const { charCount, byteCount } = calculateTotalCounts(node)
      const isInCart = cartItems.some(item => item.node.title === node.title)

      return (
        <div key={nodeId}>
          <div 
            className={`flex items-center px-2 py-1 hover:bg-accent/50 ${
              isActive ? "bg-accent" : ""
            }`}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
            role="button"
            onClick={() => onHeadingSelect(node)}
          >
            <div className="flex-1 flex items-center min-w-0">
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 mr-1"
                  onClick={(e) => toggleExpand(nodeId, e)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
              <span className="truncate">{node.title}</span>
              {isInCart && <CircleDot className="h-4 w-4 ml-2 text-green-500" />}
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Badge variant="secondary" className="h-5">
                {charCount}c
              </Badge>
              <Badge variant="outline" className="h-5">
                {byteCount}b
              </Badge>
            </div>
          </div>
          {hasChildren && isExpanded && (
            <div>{renderHeadings(node.children, level + 1)}</div>
          )}
        </div>
      )
    })
  }

  return (
    <nav className="w-80 h-full border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Navigation</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="py-2">
          {renderHeadings(headings)}
        </div>
      </ScrollArea>
    </nav>
  )
}

