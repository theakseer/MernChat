import MessageContainer from "../components/MessageContainer"
import Sidebar from "../components/Sidebar"

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-w-96 h-[80vh] mx-auto ">
      <div className="h-full w-full gap-2 flex p-10 bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
        <Sidebar/>
        <MessageContainer/>
      </div>
    </div>
  )
}

export default Home