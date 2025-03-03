import { Ellipsis } from "react-css-spinners";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 z-10 flex justify-center items-center min-h-screen w-full bg-white dark:bg-[#020817]">
      <Ellipsis color={"#7925d3"} size={150} />
    </div>
  );
}
