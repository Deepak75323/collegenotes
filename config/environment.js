const development = {
  name: "development",
  session_cookie_key: "hohoho",
  google_client_id: "your google client id",
  db: "your database link",
  google_client_secret: "your google client secret",
  google_call_back_url: "your google call back url",
  admin: "your admin email",
};

const production = {
  name: "production",
  session_cookie_key: process.env.session_cookie_key,
  db: process.env.db,
  google_client_id: process.env.CLIENTID,
  google_client_secret: process.env.CLIENTSECRET,
  google_call_back_url: process.env.CALLBACKURL,
  admin: process.env.ADMIN,
};

module.exports =
  eval(process.env.BLOG_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.BLOG_ENVIRONMENT);
