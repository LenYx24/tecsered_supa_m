// import type { NextApiHandler } from "next";
// import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
// import type { Database } from "lib/database.types";

// const handler: NextApiHandler = async (req, res) => {
//   const { code } = req.query;

//   if (code) {
//     const supabase = createPagesServerClient<Database>({ req, res });
//     await supabase.auth.exchangeCodeForSession(String(code));
//   }

//   res.redirect("/");
// };

// export default handler;
