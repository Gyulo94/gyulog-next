"use client";

import PostCard from "@/components/blog/post-card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submitButton";
import { Blog } from "@/lib/schema";
import bot from "@/public/images/bot.jpg";
import user from "@/public/images/logo.png";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  blog?: Blog;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });
      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.response,
          blog: data.blog,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.error || "알 수 없는 에러가 발생하였습니다.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error in sending message", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "An unexpected error occurred.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:w-1/2 container mx-auto h-full">
      <div className="flex-1 mt-10 min-h-[520px] max-h-[520px] md:min-h-[1000px] md:max-h-[1000px] overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            {msg.sender === "bot" && (
              <Image
                src={bot}
                alt={"bot"}
                width={40}
                height={40}
                className="hidden md:block rounded-full mr-3 max-h-[40px]"
              />
            )}
            <div
              className={`rounded-lg px-4 py-2 max-w-xl whitespace-pre-wrap ${
                msg.sender === "user" ? "bg-blue-500 " : "bg-primary-foreground"
              }`}
            >
              {msg.text}
              <div>
                {msg.sender === "bot" && msg.blog && (
                  <>
                    <p className="pb-5">
                      원하신다면 아래의 글을 확인하실 수 있습니다.
                    </p>
                    <PostCard
                      key={msg.id}
                      id={msg.blog.id}
                      title={msg.blog.title}
                      thumnail={msg.blog.thumnail}
                      category={msg.blog.category.name}
                      tags={msg.blog.tags}
                      createdAt={msg.blog.createdAt}
                    />
                  </>
                )}
              </div>
            </div>
            {msg.sender === "user" && (
              <Image
                src={user}
                alt={"user"}
                width={40}
                height={40}
                className="hidden md:block ml-3 max-h-[40px]"
              />
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start mb-4">
            <div className="flex space-x-1">
              <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
              <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
              <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex p-4 shadow">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요."
          className="flex-1 border px-4 py-2"
          disabled={loading}
        />

        <SubmitButton className="ml-4 p-2 disabled:bg-blue-300">
          <Icons.send className="h-6 w-6" />
        </SubmitButton>
      </form>
    </div>
  );
}
