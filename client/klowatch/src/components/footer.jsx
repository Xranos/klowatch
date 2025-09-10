import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-[#313f47]  py-6">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex justify-center gap-10">
                    <a href="https://github.com/Xranos" target="_blank" rel="noopener noreferrer" 
                    className="text-xl text-white hover:text-gray-400 transition-colors flex items-center gap-2" >
                        <FaGithubSquare className="inline-block" /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/ryan-frederick-99795b290/" target="_blank" rel="noopener noreferrer" 
                    className="text-xl text-white hover:text-gray-400 transition-colors flex items-center gap-2">
                        <FaLinkedin className="inline-block" /> LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;