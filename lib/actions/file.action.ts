"use server";

import fs from "fs";
import path from "path";
import * as uuid from "uuid";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File | null;

  if (!file) {
    throw new Error("이미지를 업로드 해주세요.");
  }

  const uploadsDir = path.join(process.cwd(), "public/temp");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const fileExtension = path.extname(file.name);
  const uniqueFileName = `${uuid.v4()}${fileExtension}`;
  const filePath = path.join(uploadsDir, uniqueFileName);

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    fs.writeFileSync(filePath, buffer);
    const fileUrl = `/temp/${uniqueFileName}`;
    return fileUrl;
  } catch (error) {
    console.error("파일 저장 중 오류 발생:", error);
    throw new Error("파일 저장 중 오류가 발생했습니다.");
  }
}
