import cookie from "cookie";

const handler = (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.ADMIN_TOKEN, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ message: "Giriş Başarılı" });
    } else {
      res.status(400).json({ message: "Giriş Bilgileri Yanlış" });
    }
  }

  if (method === "PUT") {
    // guncelleme islemi

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", process.env.ADMIN_TOKEN, {
        maxAge: -1, // oturumu kapatiyoruz
        path: "/",
      })
    );
    res.status(200).json({ message: "Oturumdan çıkış yapıldı" });
  }
};

export default handler;
