import { useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5'
import toast from 'react-hot-toast';
import useConversationStore from '../hooks/useConversationStore';

const SearchInput = () => {
  const [search, setSearch] = useState('')
  const { setSelectedConversation } = useConversationStore()
  const [searchList, setSearchList] = useState([])
  const [err, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    if (!search || search.length < 1) {
      return toast.error('Please enter at least 1 search character.');
    }
    try {
      const response = await fetch(`/api/users/search/?query=${search}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setIsOpen(true);
        setSearchList([]);
        err.toString().length > 0 && setTimeout(() => setIsOpen(false),2000)
      } else {
        setSearchList(data);
        setIsOpen(true);
      }
    } catch (err) {
      toast.error('An error occurred while searching. Please try again.');
    } 
  };

  const handleClick = (user) => {
    setSelectedConversation(user);
    setTimeout(() => {
      setIsOpen(false)
    }, 200);
    setSearch('')
  }
 
  useEffect(() => {},[isOpen])
  return (
    <>
      <form className="flex items-center gap-2" onSubmit={handleSearch}>
        <input type="text" className="grow input input-bordered rounded-full" placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
      </form>
      {isOpen && (<div className={`dropdown ${isOpen && 'dropdown-open'} mt-2 w-full`}>
        <div tabIndex={0} className="btn m-1 hidden" ></div>
        <ul tabIndex={0} className={`menu dropdown-content bg-base-100 rounded-box z-[100] w-56 p-2 dropdown-open shadow`}>
          {err 
          ? <li className='left-0 text-left min-h-6 px-2 text-error'> {err}</li> 
          : searchList?.map( (user, i) => 
          <li key={user._id} className={`${i!==(searchList.length-1) && 'border-b-black border-b-[1px]'} w-full py-1`}>
            <a onClick={()=> {handleClick(user)}} className='overflow-hidden w-full'>
              {user.fullName} <span className='text-sm opacity-50 p-0 m-0'>@{user.username}</span>
            </a>
          </li>
          )}
        </ul>
      </div>)}
      <p
        className={`sticky text-white text-left left-0 text-sm mt-3 py-2 px-3 mb-2 w-fit pt-0 border-b-gray-600 border-solid border-b-2`}
        aria-label="My Chats"
        defaultChecked
      >My Chats</p>  
    </>
  )
}



export default SearchInput