import Container from "./Container";

export default function Header() {
    return (
        <header className="bg-blue-600 text-white py-4 shadow">
            <Container>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Pastelaria</h1>
                    <nav>
                        <ul className="flex gap-4">
                            <li><a href="#" className="hover:underline">Início</a></li>
                            <li><a href="#" className="hover:underline">Cardápio</a></li>
                            <li><a href="#" className="hover:underline">Contato</a></li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    );
}