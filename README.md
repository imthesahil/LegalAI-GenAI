Legal AI Landing Page
A modern landing page built with Next.js and TypeScript for a legal AI platform.

**Tech Stack**

- Next.js
- React
- TypeScript
- CSS
- PostCSS
- pnpm

**Prerequisites**

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- pnpm (v8 or higher)

**Installation**

1. Clone the repository:
git clone <your-repository-url>
cd legal-ai-landing

2. Install dependencies:
pnpm install

**Running the Project**
Development Mode
To run the development server:
pnpm dev

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

**Production Build**
To create a production build:
pnpm build

**To run the production build:**
pnpm start

**Project Structure**

legal-ai-landing/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading component
│   └── page.tsx           # Home page
├── components/            # Reusable React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and libraries
├── public/                # Static assets (images, etc.)
├── styles/                # Additional stylesheets
└── types/                 # TypeScript type definitions

**Features**

- Modern Next.js App Router architecture
- TypeScript for type safety
- Responsive design
- Optimized for performance
- Component-based architecture

**Development**

The project uses:
- **Next.js App Router** for routing and layouts
- **TypeScript** for type checking
- **CSS/PostCSS** for styling
- **pnpm** for package management

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, please open an issue in the GitHub repository.
