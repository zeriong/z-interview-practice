export default function SideBar() {
  return (
    <aside className="flex h-full w-[400px] flex-col shadow-lg p-[30px]">
      <div className="text-[32px] font-bold">
        <p>Preparing</p>
        <p className="text-gray-500 ml-10">for interview</p>
      </div>
      <p className="text-gray-500 mt-10">{"< Interview List />"}</p>

      <ul className=" flex-1 overflow-auto flex flex-col gap-4 mt-4">
        {Array.from({ length: 100 }).map((_, index) => (
          <li key={index} className=" w-full rounded-lg bg-gray-100 p-4">
            {index + 1} 사이드바 콘텐츠 (테스트용 5000px)
          </li>
        ))}
      </ul>
    </aside>
  );
}
