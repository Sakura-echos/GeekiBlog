import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * API 路由：提供博客文章中的图片
 * 处理 /api/blog-images/泰国/泰国.assets/image.png 这样的请求
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // 获取图片路径
    const imagePath = params.path.join("/");

    // 构建完整的文件路径
    const filePath = path.join(process.cwd(), "lib", "trip", imagePath);

    // 读取图片文件
    const imageBuffer = await fs.readFile(filePath);

    // 根据文件扩展名设置 Content-Type
    const ext = path.extname(imagePath).toLowerCase();
    const contentTypeMap: { [key: string]: string } = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
    };

    const contentType = contentTypeMap[ext] || "application/octet-stream";

    // 返回图片
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}
