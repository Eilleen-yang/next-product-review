import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="mb-2 font-bold text-4xl">
        404 - 페이지를 찾을 수 없습니다.
      </h1>
      <p className="mb-6 text-gray-600">
        요청하신 페이지가 존재하지 않거나 삭제되었습니다.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
