const RoundArrow = ({ color }: { color: string }) => {
  return (
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.189 4.338a.405.405 0 0 0 0 .697L7.4 8.12c.27.16.612-.034.612-.348V5.607H9.3c1.7 0 3.078 1.378 3.078 3.078v.23c0 1.7-1.378 3.078-3.078 3.078H6.4a.972.972 0 1 0 0 1.944h2.9a5.022 5.022 0 0 0 5.022-5.022v-.23A5.022 5.022 0 0 0 9.3 3.663H8.013V1.601a.405.405 0 0 0-.612-.348L2.19 4.338z"
        fill={color}
      />
    </svg>
  );
};

export default RoundArrow;
