import { Navbar } from "@/components";
import { Providers } from "@/store/Providers";


export default function GeneralLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Providers>
                {children}
            </Providers>
            </main>
        </div>
        
    );
    }