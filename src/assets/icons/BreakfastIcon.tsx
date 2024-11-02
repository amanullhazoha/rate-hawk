const BreakfastIcon = ({ color }: { color: string }) => {
  return (
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.482 5.007a4.604 4.604 0 0 1 3.494-1.615c1.534 0 2.902.761 3.757 1.949a.729.729 0 1 0 1.183-.852c-1.112-1.544-2.908-2.555-4.94-2.555a6.062 6.062 0 0 0-4.597 2.12.729.729 0 1 0 1.103.953zm8.891 6.17a.729.729 0 1 0-1.289-.68c-.796 1.505-2.342 2.514-4.108 2.514-1.62 0-3.055-.849-3.896-2.152a.73.73 0 1 0-1.225.79c1.092 1.693 2.974 2.82 5.12 2.82 2.341 0 4.366-1.339 5.398-3.291zM.968 3.066a.402.402 0 0 0-.804-.017L0 7.006a.81.81 0 0 0 .81.844h.019l-.137 5.34a.733.733 0 1 0 1.467.002L2.032 7.85a.81.81 0 0 0 .807-.854l-.213-3.958a.397.397 0 0 0-.793.022v2.91a.433.433 0 1 1-.865 0V3.066zm14.468-.344c.187-.009.343.19.343.43v10.052a.74.74 0 1 1-1.479-.033l.15-3.342a.513.513 0 0 0-.07-.279c-.13-.216-.24-.386-.33-.528-.332-.522-.414-.65-.45-1.212.666-4.305 1.07-5.052 1.836-5.088zM11.015 8.2c0 1.721-1.36 3.116-3.04 3.116-1.678 0-3.038-1.395-3.038-3.115 0-1.721 1.36-3.116 3.039-3.116 1.678 0 3.039 1.395 3.039 3.116z"
        fill={color}
      />
    </svg>
  );
};

export default BreakfastIcon;
