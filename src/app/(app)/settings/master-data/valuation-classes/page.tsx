import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Page() {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold font-headline">Dados Mestre: Classes de Avaliação</CardTitle>
                    <CardDescription>Configurações relacionadas a dados mestre de classes de avaliação.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Página em construção...</p>
                </CardContent>
            </Card>
        </div>
    );
}
