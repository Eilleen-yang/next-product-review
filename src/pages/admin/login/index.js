import { useRouter } from "next/router";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    console.log(res);

    if (res.ok) {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.message || "로그인 실패");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="mb-4 text-xl font-bold">관리자 로그인</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
