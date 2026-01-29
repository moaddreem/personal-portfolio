# Personal Portfolio & Blog

A modern, responsive personal website built with Next.js 14, TypeScript, and Tailwind CSS. All content is managed through simple JSON and Markdown files.

## Features

- **Modern Stack**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **File-Based Content**: Edit JSON and Markdown files directly - no database needed
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Responsive**: Mobile, tablet, and desktop optimized
- **SEO Ready**: Per-page metadata, OpenGraph, sitemap, robots.txt

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

##  Content Files

| Content | File Location |
|---------|---------------|
| Profile | `content/profile.json` |
| Skills | `content/skills.json` |
| Achievements | `content/achievements.json` |
| Projects | `content/projects/*.md` |
| Blog Posts | `content/posts/*.md` |
| CV/Resume | `public/cv.pdf` |
| Uploads | `public/uploads/` |

## Project Structure

```
├── content/                    # All your content lives here
│   ├── profile.json           # Your bio, links, interests
│   ├── skills.json            # Skills and proficiency levels
│   ├── achievements.json      # Certificates, awards, etc.
│   ├── projects/              # Project markdown files
│   │   ├── project-1.md
│   │   └── project-2.md
│   └── posts/                 # Blog post markdown files
│       ├── post-1.md
│       └── post-2.md
├── public/
│   ├── cv.pdf                 # Your CV/resume
│   └── robots.txt
├── src/
│   ├── app/                   # Next.js App Router pages
│   ├── components/            # React components
│   └── lib/                   # Content parsing utilities
└── package.json
```

## How to Update Content

### Edit Your Profile (`content/profile.json`)

```json
{
  "name": "Your Name",
  "tagline": "Your tagline here",
  "shortBio": "A brief introduction...",
  "longBio": "Your detailed biography...",
  "interests": ["Interest 1", "Interest 2"],
  "values": [
    {
      "title": "Value Name",
      "description": "Description of this value"
    }
  ],
  "links": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "email": "your.email@example.com",
    "twitter": "",
    "website": ""
  }
}
```

### Edit Your Skills (`content/skills.json`)

```json
{
  "categories": [
    {
      "name": "Programming Languages",
      "skills": [
        { "name": "Python", "level": 90 },
        { "name": "JavaScript", "level": 85 }
      ]
    }
  ]
}
```

### Add a New Project

Create a new file in `content/projects/` (e.g., `my-new-project.md`):

```markdown
---
title: "My New Project"
date: "2024-01-15"
tags: ["web", "react"]
repo: "https://github.com/user/repo"
demo: "https://demo-url.com"
featured: true
summary: "A brief summary of the project"
stack: ["React", "Node.js", "MongoDB"]
---

## Overview

Your project description here...

## Features

- Feature 1
- Feature 2

## What I Learned

Share your learnings...
```

The slug is automatically generated from the filename (`my-new-project`).

### Add a New Blog Post

Create a new file in `content/posts/` (e.g., `my-new-post.md`):

```markdown
---
title: "My Blog Post Title"
date: "2024-01-20"
tags: ["technology", "tutorial"]
summary: "A brief summary of the post"
---

## Introduction

Your blog post content here...

## Main Content

More content...

## Conclusion

Wrap up your post...
```

### Add Achievements (`content/achievements.json`)

```json
{
  "achievements": [
    {
      "id": "unique-id",
      "title": "Achievement Title",
      "type": "certificate",
      "date": "2024-01-15",
      "organization": "Organization Name",
      "description": "Brief description",
      "link": "https://credential-url.com"
    }
  ]
}
```

**Achievement types**: `certificate`, `award`, `leadership`, `volunteering`, `speaking`

### Update Your CV

Replace `public/cv.pdf` with your actual CV file.

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

That's it! Vercel will automatically build and deploy your site.

### Environment Variables (Optional)

If you need environment variables, add them in Vercel's project settings.

## Customization

### Colors

Edit the primary color in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Change these values
    500: '#3b82f6',
    600: '#2563eb',
    // ...
  }
}
```

### Fonts

The site uses Inter by default. Change it in `src/app/layout.tsx`:

```typescript
import { Roboto } from 'next/font/google';
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
```

### Site Name

Update the site name in:
- `src/components/Navbar.tsx` - The logo text
- `src/app/layout.tsx` - The metadata title

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Content**: Markdown with gray-matter + remark
- **Deployment**: Optimized for Vercel

## License

MIT License - feel free to use this for your own portfolio!
