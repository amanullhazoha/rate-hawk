const InstagramIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M16 7a1 1 0 1 1 2 0a1 1 0 0 1-2 0" />
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M12 7.25a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5M8.75 12a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0"
        clip-rule="evenodd"
      />
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M17.258 2.833a47.721 47.721 0 0 0-10.516 0c-2.012.225-3.637 1.81-3.873 3.832a45.922 45.922 0 0 0 0 10.67c.236 2.022 1.86 3.607 3.873 3.832a47.77 47.77 0 0 0 10.516 0c2.012-.225 3.637-1.81 3.873-3.832a45.914 45.914 0 0 0 0-10.67c-.236-2.022-1.86-3.607-3.873-3.832m-10.35 1.49a46.22 46.22 0 0 1 10.184 0c1.33.15 2.395 1.199 2.55 2.517a44.421 44.421 0 0 1 0 10.32a2.89 2.89 0 0 1-2.55 2.516a46.217 46.217 0 0 1-10.184 0a2.89 2.89 0 0 1-2.55-2.516a44.421 44.421 0 0 1 0-10.32a2.89 2.89 0 0 1 2.55-2.516"
        clip-rule="evenodd"
      />
    </svg>
  );
};

export default InstagramIcon;
