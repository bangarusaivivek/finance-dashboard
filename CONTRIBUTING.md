# Contributing to FinanceHub

Thank you for your interest in contributing to FinanceHub! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 8+
- Git

### Setup Development Environment

1. **Fork the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/finance-dashboard.git
   cd finance-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create a branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing code formatting (Prettier)
- Use meaningful variable and function names
- Add comments for complex logic

### Component Structure
\`\`\`typescript
// components/example/ExampleComponent.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ExampleComponentProps {
  title: string
  onAction?: () => void
}

export function ExampleComponent({ title, onAction }: ExampleComponentProps) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Button onClick={onAction} disabled={isLoading}>
        Action
      </Button>
    </div>
  )
}
\`\`\`

### Service Structure
\`\`\`typescript
// services/example/example.service.ts
export interface ExampleData {
  id: string
  name: string
}

export const exampleService = {
  getData: async (): Promise<ExampleData[]> => {
    // Implementation
  }
}
\`\`\`

## 🧪 Testing

### Before Submitting
\`\`\`bash
npm run lint        # Check code style
npm run type-check  # Check TypeScript
npm run build       # Test build
\`\`\`

## 📋 Pull Request Process

1. **Update documentation** if needed
2. **Test your changes** thoroughly
3. **Follow the PR template**
4. **Request review** from maintainers

### PR Template
\`\`\`markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] Checked responsive design

## Screenshots
Add screenshots for UI changes
\`\`\`

## 🐛 Bug Reports

Use the issue template:
\`\`\`markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Screenshots**
Add screenshots if applicable

**Environment**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
\`\`\`

## 💡 Feature Requests

\`\`\`markdown
**Feature Description**
Clear description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this work?

**Alternatives**
Other solutions considered
\`\`\`

## 📞 Questions?

- 💬 Discord: [Join our community](https://discord.gg/financehub)
- 📧 Email: dev@financehub.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/finance-dashboard/issues)
