"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({children, session} : {
    children: React.ReactNode,
    session: any // Replace 'any' with the appropriate type if known
}){
    return <SessionProvider session={session}>
        {children}
    </SessionProvider>
}