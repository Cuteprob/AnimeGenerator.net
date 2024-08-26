"use client";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { useCallback, useEffect, useReducer, useRef } from "react";
import toast from 'react-hot-toast';
import GenerateResult from "@/components/home-section/generator/generateResult";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import Gallery from "@/components/home-section/gallery";
import { mutate } from "swr";
import { useState } from 'react';


// 定义初始状态和 reducer
const initialState = {
  content: "",
  isLoading: false,
  animeId: "",
  isGenerating: false,
};

function reducer(state: typeof initialState, action: { type: string, payload: any }) {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ANIME_ID':
      return { ...state, animeId: action.payload };
    case 'SET_GENERATING':
      return { ...state, isGenerating: action.payload };
    case 'RESET':
      return { ...state, content: "", isGenerating: false };
    default:
      return state;
  }
}

const Generator = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) => {
  const { isSignedIn } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { content, isLoading, animeId, isGenerating } = state;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const hasGeneratedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedContent = localStorage.getItem("content") || "";
      const savedGenerating = JSON.parse(localStorage.getItem("isGenerating") || "false");
      dispatch({ type: 'SET_CONTENT', payload: savedContent });
      dispatch({ type: 'SET_GENERATING', payload: savedGenerating });
    }
  }, []);

  useEffect(() => {
    if (isSignedIn && isGenerating && !hasGeneratedRef.current) {
      handleGenerate();
      hasGeneratedRef.current = true;
    }
  }, [isSignedIn, isGenerating]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("content", content);
      localStorage.setItem("isGenerating", JSON.stringify(isGenerating));
    }
  }, [content, isGenerating]);

  const handleGenerate = useCallback(async () => {
    if (!content) {
      toast.error(locale.noContentError);
      return;
    }

    if (!isSignedIn) {
      dispatch({ type: 'SET_GENERATING', payload: true });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || response.statusText);
      }

      const data = await response.json();
      dispatch({ type: 'SET_ANIME_ID', payload: data.id });
      mutate('/api/credits');

      toast.success(locale.toastSuccess);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("NSFW content detected")) {
          toast.error(locale.nsfwError);
        } else {
          toast.error(locale.failedError + error.message);
        }
      } else {
        toast.error(locale.toastError);
      }
      console.error("Failed to generate image:", error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'RESET', payload: null });
      localStorage.removeItem("isGenerating");
    }
  }, [content, isSignedIn, locale]);

  return (
    <div className="mx-3 md:mx-28">
      <div className="max-w-3xl mx-auto">
        <Textarea
          key="input"
          placeholder={locale.promptPlaceholder}
          className="w-full p-3 mb-4 border-2 border-purple-400 rounded-lg text-gray-800"
          rows={4}
          value={content}
          onChange={(e) => dispatch({ type: 'SET_CONTENT', payload: e.target.value })}
          aria-label="Enter generation prompt"
        />
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <Button
              className="bg-second hover:bg-pink-600 text-white font-bold py-3 px-10 rounded-full transition duration-300 transform hover:-translate-y-1 mb-8"
              disabled={!content}
              onClick={() => dispatch({ type: 'SET_GENERATING', payload: true })}
            >
              {locale.buttonTextGenerate}
            </Button>
          </SignInButton>
        ) : (
          <Button
            className="bg-second hover:bg-pink-600"
            onClick={handleGenerate}
            disabled={!content || isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 w-5 h-5 animate-spin" />
                {locale.buttonTextGenerating}
              </>
            ) : (
              locale.buttonTextGenerate
            )}
          </Button>
        )}
      </div>
      <GenerateResult id={animeId} locale={locale} />
      <Gallery page={page} setTotalPages={setTotalPages} showViewMore={true} locale={locale} langName={langName}/>
    </div>
  );
};

export default Generator;