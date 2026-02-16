# 📸 PhotographyLab

Modern photography portfolio web application built with **Next.js**,
styled using **Tailwind CSS**, and powered by **Cloudinary** for
optimized image delivery.

🚀 **Live Website**\
https://photographylab-front-4u9c-788ifup3a-rami-zairis-projects.vercel.app/

------------------------------------------------------------------------

## 🎥 Project Demo

### ▶ Watch Full Demo on YouTube

[![PhotographyLab
Demo](https://img.youtube.com/vi/81tFbOX8WrI/maxresdefault.jpg)](https://www.youtube.com/watch?v=81tFbOX8WrI)

📺 Direct Link:\
https://www.youtube.com/watch?v=81tFbOX8WrI

------------------------------------------------------------------------

## ✨ Features

-   ⚡ Built with Next.js for high performance
-   🎨 Modern UI powered by Tailwind CSS
-   ☁️ Cloudinary integration for image hosting & transformations
-   📱 Fully responsive (mobile, tablet, desktop)
-   🖼 Dynamic image rendering
-   🚀 Deployed on Vercel
-   🧩 Component-based architecture
-   🌐 SEO-friendly structure

------------------------------------------------------------------------

## 🧱 Tech Stack

-   **Next.js**
-   **React**
-   **Tailwind CSS**
-   **Cloudinary**
-   **Node.js**
-   **Vercel**

------------------------------------------------------------------------

## 📂 Project Structure

    .
    ├── pages/                # Application routes
    ├── components/           # Reusable UI components
    ├── constant/  
    ├── hooks/  
    ├── lib/                  # Utilities and Cloudinary logic
    ├── public/               # Static assets
    ├── styles/               # Global styles
    └── README.md

------------------------------------------------------------------------

## ⚙️ Getting Started (Local Development)

### 1️⃣ Clone the repository

``` bash
git clone https://github.com/ramizairi/PhotographyLab-NextJS.git
cd PhotographyLab-NextJS
```

### 2️⃣ Install dependencies

``` bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env.local` file in the root directory:

``` env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

⚠️ Never expose `CLOUDINARY_API_SECRET` on the client side.

------------------------------------------------------------------------

### 4️⃣ Run Development Server

``` bash
npm run dev
```

Open in browser:

http://localhost:3000

------------------------------------------------------------------------

## 🏗 Production Build

``` bash
npm run build
npm run start
```

------------------------------------------------------------------------

## ☁️ Deployment (Vercel)

1.  Push project to GitHub
2.  Import repository into Vercel
3.  Add environment variables in Vercel dashboard
4.  Deploy 🚀

------------------------------------------------------------------------

## 🖼 Cloudinary Optimization Strategy

-   Automatic format & quality optimization (`f_auto,q_auto`)
-   Responsive transformations
-   CDN-powered fast delivery
-   Efficient image management

------------------------------------------------------------------------

## 🎯 Performance Highlights

-   Optimized image loading
-   Responsive layout
-   Clean component structure
-   Production-ready deployment

------------------------------------------------------------------------

## 👨‍💻 Author

**Rami Zairi**

Built with ❤️ using Next.js, Tailwind CSS, and Cloudinary.
