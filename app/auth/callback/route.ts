import { rolesService, usersService } from "@/modules";
import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabase-server-client";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // URL to redirect to after sign in process completes
  const next = searchParams.get("next") || "/";
  

  console.log("🚀 ~ GET ~ code:", code)
  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );  
    const { error } =
      await supabase.auth.exchangeCodeForSession(code);
    console.log("🚀 ~ GET ~ error:", error)
    if (!error) {
      // Get the user
      const {
        data: { user },
      } = await supabase.auth.getUser();
        console.log("🚀 ~ GET ~ user:", user)

      if (user) {
        // Check if the user has a profile
        const userProfile = await usersService.getUserById(user.id);

        if (!userProfile) {
          // Get the default user role using GraphQL
          const roleId = await rolesService.getRoleByName();
          const payload = {
            id: user?.id,
            email: user?.email,
            role_id: roleId,
            first_name: user?.user_metadata.first_name || null,
            last_name: user?.user_metadata.last_name || null,
            full_name: user?.user_metadata.full_name || null,
            is_active: true,
          };

          await usersService.insertUser(payload);

          // Redirect to onboarding
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
        }
      }

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}${next}`
      );
    }
  }

  // Return the user to the error page if something goes wrong
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/auth/login/error?type=auth_callback_error`
  );
}
