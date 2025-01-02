export const resStatus = {
  ok: 200, //Yêu cầu thành công (ví dụ: res.status(200).send("Success")).
  error: 400, //Yêu cầu không hợp lệ (ví dụ: res.status(400).json({ error: "Invalid data" })).
  errorAuthen: 401, //Yêu cầu cần xác thực (ví dụ: res.status(401).send("Authentication required")).
  errorServer: 500,
};
