import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      role: string;
      image: string;
    };
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      name: string;
      email: string;
      role: string;
      image: string;
    };
  }
}
