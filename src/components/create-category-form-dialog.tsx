"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Plus } from "lucide-react";
import { capitalize, map } from "lodash";

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
import { categories as CategoriesSchema, color as ColorSchema } from "@/db/schema";
import { categoryColorMap } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";
import { createCategory } from "@/lib/services/category.service";

const colorOptions = ColorSchema.enumValues;

const createCategorySchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  color: z.enum(colorOptions),
  description: z.string().optional(),
});

type CategoryFormSchema = z.infer<typeof createCategorySchema>;
interface CategoryFormDialogProps {
  categories: (typeof CategoriesSchema.$inferSelect)[];
}

export function CategoryFormDialog({ categories }: CategoryFormDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: CategoryFormSchema) => {
    const existingTitles = new Set(map(categories, ({ title }) => title.toLowerCase()));
    if (existingTitles.has(values.title.toLowerCase())) {
      form.setError("title", {
        type: "custom",
        message: `Category with title "${values.title}" already exists..`,
      });
      return;
    }

    await createCategory(values)
      .then(() => {
        setOpen(false);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="py-4 min-w-40 mt-8 shadow-sm">
          <Plus />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle>Create a new category</DialogTitle>
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
                              className={`${categoryColorMap[colorOption]} w-3 h-3 rounded-full`}
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
