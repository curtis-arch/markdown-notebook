'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@codemirror/view'
import { useCart } from '../contexts/CartContext'
import { HeadingNode } from '../utils/markdownParser'
import { Notebook } from 'lucide-react'
import { Cart } from './Cart'

interface ContentViewerProps {
  content: string
  selectedNode: HeadingNode | null
  charCount: number
  byteCount: number
}

export function ContentViewer({ content, selectedNode, charCount, byteCount }: ContentViewerProps) {
  const [activeTab, setActiveTab] = useState<"source" | "preview">("source")
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    })
  }

  const handleAddToNotebook = () => {
    if (selectedNode) {
      addToCart({ node: selectedNode, content })
      toast({
        title: "Added to notebook",
        description: `"${selectedNode.title}" has been added to your notebook.`,
      })
    }
  }

  return (
    <div className="flex-1 h-full p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Content: {selectedNode?.title || ''}</h2>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Badge variant="secondary">{charCount} chars</Badge>
            <Badge variant="outline">{byteCount} bytes</Badge>
          </div>
          <Button onClick={handleCopy}>Copy</Button>
          <Button onClick={handleAddToNotebook} disabled={!selectedNode}>
            <Notebook className="mr-2 h-4 w-4" />
            Add to Notebook
          </Button>
          <Cart />
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "source" | "preview")} className="flex-grow flex flex-col">
        <TabsList>
          <TabsTrigger value="source">Source</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="source" className="flex-grow">
          <CodeMirror
            value={content}
            height="100%"
            extensions={[
              markdown(),
              EditorView.lineWrapping
            ]}
            editable={false}
          />
        </TabsContent>
        <TabsContent value="preview" className="flex-grow">
          <ScrollArea className="h-full">
            <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

