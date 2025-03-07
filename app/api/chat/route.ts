import { findByBot } from "@/lib/actions/blog.action";
import { Blog } from "@/lib/schema";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        {
          error: "메시지를 입력해주세요.",
        },
        { status: 400 }
      );
    }

    const keywords = extractKeywords(message);
    const blogs = await searchBlogs(keywords);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-8b-8192",
    });

    const responseMessage =
      chatCompletion.choices[0].message.content || "응답이 없습니다.";

    const blog = blogs.length > 0 ? blogs[0] : null;

    return NextResponse.json({ response: responseMessage, blog });
  } catch (error) {
    console.log("Error in chat API", error);
    return NextResponse.json(
      { error: "요청 처리중 에러가 발생하였습니다." },
      { status: 500 }
    );
  }
}

function extractKeywords(question: string): string[] {
  return question.split(" ").map((word) => word.toLowerCase());
}

async function searchBlogs(keywords: string[]): Promise<Blog[]> {
  const keywordString = keywords.join(" ");
  const result = await findByBot(keywordString);
  return result;
}
