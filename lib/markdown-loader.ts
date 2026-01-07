import { promises as fs } from "fs";
import path from "path";

/**
 * 在构建时读取 markdown 文件内容
 * 这样内容会被嵌入到静态生成的页面中
 */
export async function loadMarkdownContent(
  contentPath: string
): Promise<{ content: string; imageBasePath: string }> {
  try {
    const filePath = path.join(process.cwd(), contentPath);
    const content = await fs.readFile(filePath, "utf-8");

    // 获取图片的基础路径
    const contentDir = path.dirname(contentPath);
    const imageBasePath = contentDir.replace("lib/trip/", "");

    return { content, imageBasePath };
  } catch (error) {
    console.error("Error reading markdown file:", error);
    console.error("Path:", contentPath);
    throw error;
  }
}

