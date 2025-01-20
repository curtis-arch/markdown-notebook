import { MarkdownViewer } from '../components/MarkdownViewer'
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen">
      <MarkdownViewer />
      <Toaster />
    </main>
  )
}

