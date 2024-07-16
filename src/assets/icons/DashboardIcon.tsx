const DashboardIcon = ({ fill }: { fill?: string }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M11 18C10.7348 18 10.4804 17.8946 10.2929 17.7071C10.1054 17.5196 10 17.2652 10 17V9C10 8.73478 10.1054 8.48043 10.2929 8.29289C10.4804 8.10536 10.7348 8 11 8H17C17.2652 8 17.5196 8.10536 17.7071 8.29289C17.8946 8.48043 18 8.73478 18 9V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H11ZM1 10C0.734784 10 0.48043 9.89464 0.292893 9.70711C0.105357 9.51957 0 9.26522 0 9V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H7C7.26522 0 7.51957 0.105357 7.70711 0.292893C7.89464 0.48043 8 0.734784 8 1V9C8 9.26522 7.89464 9.51957 7.70711 9.70711C7.51957 9.89464 7.26522 10 7 10H1ZM6 8V2H2V8H6ZM1 18C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V13C0 12.7348 0.105357 12.4804 0.292893 12.2929C0.48043 12.1054 0.734784 12 1 12H7C7.26522 12 7.51957 12.1054 7.70711 12.2929C7.89464 12.4804 8 12.7348 8 13V17C8 17.2652 7.89464 17.5196 7.70711 17.7071C7.51957 17.8946 7.26522 18 7 18H1ZM2 16H6V14H2V16ZM12 16H16V10H12V16ZM10 1C10 0.734784 10.1054 0.48043 10.2929 0.292893C10.4804 0.105357 10.7348 0 11 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1V5C18 5.26522 17.8946 5.51957 17.7071 5.70711C17.5196 5.89464 17.2652 6 17 6H11C10.7348 6 10.4804 5.89464 10.2929 5.70711C10.1054 5.51957 10 5.26522 10 5V1ZM12 2V4H16V2H12Z"
        fill={fill ? fill : "#211E03"}
      />
    </svg>
  );
};

export default DashboardIcon;
