import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Page() {
    return (
        <div className="p-4 md:p-8">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold font-headline">SuperUser: Clientes</CardTitle>
                    <CardDescription>Gerenciamento de clientes da plataforma.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Página em construção...</p>
                </CardContent>
            </Card>
        </div>
    );
}
