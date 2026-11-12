import { APP_DOWNLOAD } from "@/lib/constants";

export const AppStoreBadges = () => {
  return (
    <div className="flex flex-wrap items-center gap-3.5">
      {/* Apple App Store */}
      <a
        href={APP_DOWNLOAD.appleStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className="group inline-flex h-[52px] min-w-[164px] items-center gap-3 rounded-[10px] border border-white/15 bg-[#0b131d] px-4 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-black"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 fill-current"
        >
          <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
        </svg>
        <span className="text-left leading-none">
          <span className="block text-[10px] font-medium tracking-tight text-white/80">
            Download on the
          </span>
          <span className="mt-0.5 block font-heading text-[17px] font-semibold tracking-tight">
            App Store
          </span>
        </span>
      </a>

      {/* Google Play */}
      <a
        href={APP_DOWNLOAD.playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
        className="group inline-flex h-[52px] min-w-[172px] items-center gap-3 rounded-[10px] border border-white/15 bg-[#0b131d] px-4 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-black"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0"
        >
          <path
            d="M3.609 1.814 13.792 12 3.61 22.186a1.73 1.73 0 0 1-.61-1.334V3.148c0-.528.234-1.003.609-1.334Z"
            fill="#32BBFF"
          />
          <path
            d="m17.197 8.595-3.405 3.405 3.405 3.405 3.847-2.182c.688-.39.688-1.376 0-1.766l-3.847-2.862Z"
            fill="#FFCE00"
          />
          <path
            d="M13.792 12 3.61 22.186c.389.349.974.442 1.565.107l12.022-6.888L13.792 12Z"
            fill="#F14336"
          />
          <path
            d="M17.197 8.595 5.175 1.707c-.591-.335-1.176-.242-1.565.107L13.792 12l3.405-3.405Z"
            fill="#00F076"
          />
        </svg>
        <span className="text-left leading-none">
          <span className="block text-[9.5px] font-medium uppercase tracking-wider text-white/80">
            Get it on
          </span>
          <span className="mt-0.5 block font-heading text-[17px] font-semibold tracking-tight">
            Google Play
          </span>
        </span>
      </a>
    </div>
  );
};

