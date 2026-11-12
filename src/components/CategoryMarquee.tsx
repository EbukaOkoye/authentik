import { PRODUCT_CATEGORIES } from "@/lib/constants";

export const CategoryMarquee = () => {
  const items = [...PRODUCT_CATEGORIES, ...PRODUCT_CATEGORIES];

  return (
    <section aria-label="Product categories" className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <p className="hidden shrink-0 text-sm leading-snug text-muted-foreground md:block">
          For everyday products
          <br />
          sold across Nigeria
        </p>

        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <ul className="animate-scroll-infinite items-center">
            {items.map((item, idx) => (
              <li
                key={`${item}-${idx}`}
                className="flex shrink-0 items-center gap-10 pr-10 font-heading text-lg font-medium text-foreground/70"
              >
                <span>{item}</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary/50" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

