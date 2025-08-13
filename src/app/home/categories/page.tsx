import { fetchCategories } from "@/services/category.service";

export default async function Categories() {
  const categories = await fetchCategories();
  console.log("categories", categories);

  return (
    <div className="flex flex-col gap-4 w-full pl-8 pt-6 items-center sm:items-start">
      <h4 className="text-2xl">Categories</h4>
      <p className="text-muted-foreground text-lg">
        Categories help you understand where your income and expenses are going
        to.
      </p>
      {categories.map((category) => (
        <div
          key={category.id}
          className={`flex flex-col gap-2 p-2 bg-${category.color}-300`}
        >
          <span className="text-sm font-semibold">{category.title}</span>
        </div>
      ))}
    </div>
  );
}
