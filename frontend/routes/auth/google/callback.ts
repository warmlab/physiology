import { Handlers } from "$fresh/server.ts";

const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID")!;
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET")!;
const REDIRECT_URI = "https://arcticcircle.work/auth/google/callback";
const BACKEND_GOOGLE_LOGIN = "http://localhost:8000/auth/google";

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return new Response("Missing code", { status: 400 });
    }

    // Exchange code for token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return new Response("Failed to get Google token", { status: 500 });
    }

    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const profile = await userInfoRes.json();
    // Forward profile to FastAPI
    const backendRes = await fetch(BACKEND_GOOGLE_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (!backendRes.ok) {
      return new Response("Login failed", { status: 500 });
    }

    const result = await backendRes.json()

    // Store token and user in localStorage via script in /auth/success
    const query = new URLSearchParams({
      token: result.access_token,
      user: JSON.stringify(result.user)
      //user: JSON.stringify({
	      //username: result.user.username,
	      //email: result.user.email,
	      //avatar: result.user.avatar

      //}),
    });

    // Redirect with email or token
    //return new Response(null, {
    //  status: 302,
    //  headers: {
    //    Location: `/auth/success?email=${profile.email}`,
    //  },
    //});
    //return Response.redirect(`/auth/success?${query.toString()}`, 302);
    return new Response(null, {
	  status: 302,
	  headers: {
	    Location: `/auth/success?${query.toString()}`,
	  },
	});
  },
};
