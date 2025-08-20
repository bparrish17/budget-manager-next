"use client";

import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { capitalize, map } from "lodash";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { categories, color as ColorSchema } from "@/db/schema";
import { categoryBgColorMap } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";
import {
  createCategory,
  updateCategory,
  TInsertCategory,
  TCategory,
  TUpdateCategory,
} from "@/lib/services/category.service";

export const CreateCategorySchema = createInsertSchema(categories, {
  title: (schema) => schema.min(1, "Title is required"),
  color: z.enum(ColorSchema.enumValues),
  description: (schema) => schema.nullable(),
});
export const UpdateCategorySchema = createUpdateSchema(categories, {
  title: (schema) => schema.min(1, "Title is required"),
  color: z.enum(ColorSchema.enumValues),
  description: (schema) => schema.nullable(),
});

export type TUpdateCategorySchema = Omit<
  z.infer<typeof UpdateCategorySchema>,
  "createdAt" | "userId"
>;
export type TCreateCategorySchema = Omit<
  z.infer<typeof CreateCategorySchema>,
  "id" | "createdAt" | "userId"
>;

const colorOptions = ColorSchema.enumValues;

type TCreateUpdateCategory = TCreateCategorySchema | TUpdateCategorySchema;
type TCategoryFormDialogProps = {
  title: string;
  type: "create" | "update";
  categoryId?: number;
  defaultValues: Partial<TCreateUpdateCategory>;
  children: React.ReactNode;
  categories: TCategory[];
  onConfirm?: () => void;
};

export function CategoryFormDialog({
  title,
  type,
  categoryId,
  defaultValues,
  children,
  categories,
  onConfirm,
}: TCategoryFormDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<TCreateUpdateCategory>({
    resolver: zodResolver(type === "update" ? UpdateCategorySchema : CreateCategorySchema),
    defaultValues,
  });

  const onSubmit = async (values: TCreateUpdateCategory) => {
    const existingTitles = new Set(map(categories, ({ title }) => title.toLowerCase()));
    if (existingTitles.has(values.title!.toLowerCase())) {
      form.setError("title", {
        type: "custom",
        message: `Category with title "${values.title}" already exists..`,
      });
      return;
    }

    try {
      if (type === "create") {
        await createCategory(values as TInsertCategory);
      } else {
        await updateCategory({ id: categoryId!, ...values } as TUpdateCategory);
      }
      if (onConfirm) onConfirm();
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a color for your category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colorOptions.map((colorOption) => (
                          <SelectItem key={colorOption} value={colorOption}>
                            <div
                              className={`${categoryBgColorMap[colorOption]} w-3 h-3 rounded-full`}
                            />
                            {capitalize(colorOption)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add some details about this category"
                      className="field-sizing-fixed"
                      rows={3}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="ml-auto">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
