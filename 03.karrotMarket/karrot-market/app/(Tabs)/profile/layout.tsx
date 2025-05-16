import { getUser } from "@/lib/getUser";
import { headers } from "next/headers";
import ProfileMobile from "@/components/ProfileMobile";
import ProfileDesktop from "@/components/ProfileDesktop";

export interface IUserProfile {
  id: number;
  username: string;
  email: string | null;
  password: string | null;
  phone: string | null;
  github_id: string | null;
  google_id: string | null;
  kakao_id: string | null;
  avatar: string | null;
  updated_at: Date;
}

export default async function layout({children}: Readonly<{children: React.ReactNode;}>) {
  const header = await headers();
  const userAgent = header.get('user-agent')||'';
  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

  const user = await getUser();

  return isMobile
    ? <ProfileMobile user={user}>{children}</ProfileMobile>
    : <ProfileDesktop user={user}>{children}</ProfileDesktop>
}
