import Link from 'next/link'; 

const Footer = () => {
    return (
        <footer className="bg-gray-200 py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <ul className="flex flex-col md:flex-row space-x-0 md:space-x-6 mb-4 md:mb-0">
                        <li>
                            <Link href="/mentions-legales" className="text-gray-700 hover:text-primary">Mentions légales</Link>
                        </li>
                        <li>
                            <Link href="/cgu" className="text-gray-700 hover:text-primary">CGU</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
                        </li>
                    </ul>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[primary]">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
