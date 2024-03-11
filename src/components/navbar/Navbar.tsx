import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    return (
        <div className="mt-[200px] md:mt-20 text-secondary">
            <nav className="fixed top-0 md:h-[80px] w-full flex justify-between flex-wrap bg-primary p-6 z-50">
                <div
                    className="flex mr-8 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <img className="fill-current h-12 w-8 mr-4 mt-[-9px]" />
                    <span className="font-middle-saxony tracking-widest font-semibold text-xl">
                        Balatro mods library
                    </span>
                </div>
                <div className="w-full flex-grow md:flex md:items-center md:text-left text-center md:w-auto mt-5 md:mt-0">
                    <div className="text-sm md:flex h-full">
                        <div className={`mt-4 md:mt-1 mr-4`}>
                            <Link className={`nav-link inline-block`} to="/">
                                Link
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
