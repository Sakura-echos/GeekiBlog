import Link from "next/link";

/**
 * 404 页面
 * 当用户访问不存在的页面时显示
 */
export default function NotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center px-4">
            <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
            <p className="text-xl text-text-secondary mb-8">Page not found</p>
            <Link
              href="/zh"
              className="inline-block px-6 py-3 bg-text-primary text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
