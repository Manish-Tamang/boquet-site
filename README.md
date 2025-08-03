# 🌸 Bouquet Site - Beautiful Flower Shop

A modern, responsive e-commerce website for a flower shop built with Next.js, featuring a beautiful UI, Sanity CMS integration, and eSewa payment gateway integration.

![Bouquet Site](https://img.shields.io/badge/Next.js-14.2.16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)
![Sanity](https://img.shields.io/badge/Sanity-3.77.2-orange?style=for-the-badge&logo=sanity)

![Homepage Screenshot](https://github.com/Manish-Tamang/boquet-site/blob/main/public/Screenshot%202025-08-03%20212629.png?raw=true)

## ✨ Features

- **🌺 Beautiful Product Catalog** - Browse through various bouquet categories and seasonal collections
- **🛒 Shopping Cart** - Add items to cart with quantity and variant selection
- **💳 eSewa Payment Integration** - Secure payment processing with Nepal's popular eSewa gateway
- **📱 Responsive Design** - Mobile-first design that works perfectly on all devices
- **🎨 Modern UI/UX** - Built with Radix UI components and Tailwind CSS
- **📊 CMS Integration** - Sanity CMS for easy content management
- **🔍 Product Search & Filtering** - Find bouquets by category, collection, and more
- **⭐ Featured Products** - Highlight special bouquets on the homepage
- **📸 Image Gallery** - High-quality product images with zoom functionality
- **🚀 Fast Performance** - Optimized with Next.js 14 App Router

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend & CMS
- **Sanity CMS** - Headless content management system
- **Next.js API Routes** - Server-side API endpoints

### Payment & Security
- **eSewa Gateway** - Nepal's leading digital payment platform
- **Crypto-js** - Secure signature generation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Sanity account (for CMS)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Manish-Tamang/boquet-site
   cd boquet-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_ESEWA_MERCHANT_CODE=your_esewa_merchant_code
   NEXT_PUBLIC_ESEWA_SECRET_KEY=your_esewa_secret_key
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_sanity_api_token
   ```

4. **Set up Sanity Studio**
   ```bash
   npm run dev
   ```
   Then visit `http://localhost:3000/studio` to configure your content.

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
boquet-site/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── category/          # Category pages
│   ├── checkout/          # Checkout flow
│   ├── product/           # Product pages
│   └── studio/            # Sanity Studio
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── sanity/               # Sanity CMS configuration
│   ├── schemaTypes/      # Content schemas
│   └── lib/              # Sanity utilities
└── types.ts              # TypeScript type definitions
```

## 🎨 Key Components

- **Product Catalog** - Browse bouquets by category and collection
- **Shopping Cart** - Add, remove, and manage cart items
- **Checkout Flow** - Secure payment with eSewa integration
- **Product Gallery** - High-quality image display
- **Responsive Navigation** - Mobile-friendly navigation menu

## 💳 Payment Integration

This project includes eSewa payment gateway integration for the Nepalese market:

- Secure payment processing
- Digital signature verification
- Success/failure handling
- Transaction tracking

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ronish Poudel** - For the excellent blog post on integrating eSewa and Khalti payment gateways in Next.js 14. You can find the tutorial [here](https://medium.com/@paudelronish/integrating-esewa-and-khalti-payment-gateways-in-next-js-14-with-server-actions-f15729ffae3e).

**Note**: The images used in this website were screenshotted from a Nepali bouquet shop Instagram Posts. I apologize, but I cannot recall the specific shop name at the moment.

---

## ⭐ Star This Repository

If you find this project helpful, please consider giving it a star! ⭐

Your support helps motivate me to continue building and improving this project. Thank you! 🙏

---

**Made with ❤️ for beautiful flower arrangements**
