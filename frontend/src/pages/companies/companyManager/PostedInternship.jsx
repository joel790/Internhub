import { useState } from "react"
import PostInternshipForm from "./PostInternshipForm"
 const PostedInternship = () => {
  const [add,setAdd]=useState(false)
  const handleAddclick=()=>{
    setAdd(true)
  }
  return (
    <div>
        <h1 className="text-white">
            this is posted internships
        </h1>
        <div className="flex flex-row justify-end mr-10">
        <button className="text-green-500 ml-11" onClick={handleAddclick}>add</button>

        </div>
        {add&&<PostInternshipForm/>}
    </div>
  )
}
export default PostedInternship
