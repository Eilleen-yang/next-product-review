export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;

  const ADMIN_ID = "admin";
  const ADMIN_PW = "password123";

  if (username === ADMIN_ID && password === ADMIN_PW) {
    return res.status(200).json({ message: "로그인 성공" });
  }

  return res
    .status(401)
    .json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
}
