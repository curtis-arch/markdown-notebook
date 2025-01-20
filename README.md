# Markdown Notebook

A modern, interactive markdown viewer and notebook organizer built with Next.js and TypeScript. This application allows users to view, organize, and manage markdown content with an intuitive interface and powerful features.

## Features

### 1. Interactive Markdown Viewer
- **Dual View Mode**: Toggle between source code and rendered preview
- **Syntax Highlighting**: Code highlighting in the source view using CodeMirror
- **Real-time Preview**: See your markdown rendered in real-time

### 2. Smart Navigation
- **Hierarchical Structure**: Automatically generates a navigation tree from markdown headings
- **Expandable Sections**: Collapsible navigation items for better organization
- **Visual Indicators**: Shows active sections and items added to notebook

### 3. Content Analysis
- **Character Count**: Real-time character count for selected sections
- **Byte Size**: Displays byte size information for content optimization
- **Nested Calculations**: Automatically calculates total counts for nested sections

### 4. Notebook Management
- **Add to Notebook**: Save important sections for later reference
- **Cart System**: Manage selected content in a cart-like interface
- **Quick Actions**: Copy content and manage notebook items easily

### 5. User Interface
- **Modern Design**: Clean and responsive interface using Tailwind CSS
- **Toast Notifications**: Informative feedback for user actions
- **Accessible**: Built with accessibility in mind using Radix UI primitives

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI primitives
  - Shadcn/ui components
- **Editor**: CodeMirror with markdown support
- **State Management**: React Context API

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone https://github.com/curtis-arch/markdown-notebook.git
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

<pre>
├── app/
    ├── layout.tsx       # Root layout
    └── page.tsx         # Main page
├── components/
    ├── MarkdownViewer.tsx    # Main viewer component
    ├── Navigation.tsx        # Navigation tree
    ├── ContentViewer.tsx     # Content display
    ├── Cart.tsx             # Notebook cart
    └── ui/                  # UI components
├── contexts/
    └── CartContext.tsx      # Notebook state management
└── utils/
    └── markdownParser.ts    # Markdown parsing utilities
</pre>

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 