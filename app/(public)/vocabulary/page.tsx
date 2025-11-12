"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { vocabularySchema, vocabularySchemaType } from "@/lib/zod-shemas";
import { CreateVocabulary } from "./action";

const Page = () => {
  const [creating, setCreating] = useState(false);
  const form = useForm<vocabularySchemaType>({
    resolver: zodResolver(vocabularySchema),
    defaultValues: { question: "", answer: "" },
  });

  async function onSubmit(data: vocabularySchemaType) {
    try {
      setCreating(true);
      const { message, code } = await CreateVocabulary(data);

      if (code === 200) toast.success(message);
      else toast.error(message);
      form.reset(); // Reset form sau khi submit
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className=" bg-zinc-950 flex items-center justify-center p-5 w-full max-w-2xl">
      <div className="w-full ">
        <h2 className="text-5xl font-extrabold text-white mb-6 text-center">
          Vocabulary
        </h2>
        <Card className="bg-zinc-900 border border-zinc-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Thêm từ vựng mới
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Hãy thêm mỗi ngày một từ vựng mới nhé!
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Form {...form}>
              <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Câu hỏi (Vietnamese)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập câu hỏi..."
                          {...field}
                          className="bg-zinc-800 text-white border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-green-500 transition"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Câu trả lời (English)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập câu trả lời..."
                          {...field}
                          className="bg-zinc-800 text-white border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-green-500 transition"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={creating}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl shadow-md transition"
                >
                  {creating ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" /> Đang tạo
                    </>
                  ) : (
                    "Thêm ngay"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
