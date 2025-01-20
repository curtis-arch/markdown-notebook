'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (content: string) => void
}

export function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    onSubmit(content)
    setContent('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paste your Markdown</DialogTitle>
        </DialogHeader>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px]"
          placeholder="Paste your markdown here..."
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  )
}

