import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className='py-8 flex items-center justify-between mb-5'>
      <div className='logo'>
        <h1 className='font-bold text-white text-4xl'>
          <Link to='/'>RMovies</Link>
        </h1>
      </div>
      <nav className='flex items-center'>
        <ul className='flex items-center gap-x-8'>
          <li>
            <Link className='text-lg font-semibold' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='text-lg font-semibold' to='/about'>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
