'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from '../contexts/CartContext'
import { Notebook, Download, Trash2, Copy, FileDown } from 'lucide-react'

export function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const downloadSingle = (title: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAll = () => {
    const allContent = cartItems.map(item => `# ${item.node.title}\n\n${item.content}`).join('\n\n')
    const blob = new Blob([allContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'all_notebook_items.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyAllToClipboard = () => {
    const allContent = cartItems.map(item => `# ${item.node.title}\n\n${item.content}`).join('\n\n')
    navigator.clipboard.writeText(allContent).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "All notebook items have been copied to your clipboard.",
      })
    })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Notebook className="h-4 w-4" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-3xl w-[1200px] sm:w-[1400px]">
        <SheetHeader>
          <SheetTitle>Notebook</SheetTitle>
        </SheetHeader>
        <div className="flex justify-between mt-4 mb-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Notebook
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all items from your notebook.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearCart}>
                  Yes, clear notebook
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="space-x-2">
            <Button onClick={copyAllToClipboard} disabled={cartItems.length === 0}>
              <Copy className="mr-2 h-4 w-4" />
              Copy All
            </Button>
            <Button onClick={downloadAll} disabled={cartItems.length === 0}>
              <FileDown className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-150px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Name</TableHead>
                <TableHead>Chars</TableHead>
                <TableHead>Bytes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.node.title}>
                  <TableCell className="font-medium">{item.node.title}</TableCell>
                  <TableCell>{formatNumber(item.content.length)}</TableCell>
                  <TableCell>{formatNumber(new Blob([item.content]).size)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => downloadSingle(item.node.title, item.content)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeFromCart(item.node.title)}
                      className="ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

