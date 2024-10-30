import {IoSearchSharp} from 'react-icons/io5'
const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
        <input type="text" className="grow input input-bordered rounded-full" placeholder="Search" />
        <button onClick={(e)=>{
          e.preventDefault();
        }} className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput