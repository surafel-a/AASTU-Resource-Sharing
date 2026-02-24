import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faDownload } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  return (
    <>
      <div className="mx-50 mt-10 flex gap-5 bg-[#1152D4] px-20 py-15 text-white rounded-2xl shadow-2xl">
        <div className="w-[60%] flex flex-col gap-5">
          <h1 className="font-bold text-5xl">Welcome back, Abebe</h1>
          <p className="text-xl">
            Ready to crush your Engineering exams? Find the latest lecture notes
            and past papers shared by your peers.
          </p>
          <div className="flex gap-5">
            <button className="bg-white text-[#1152D4] px-8 py-3 rounded-lg font-bold cursor-pointer">
              View My Analytics
            </button>
            <button className="border-3 border-white text-white px-8 py-3 rounded-lg font-bold cursor-pointer">
              Study Roadmap
            </button>
          </div>
        </div>

        <div className="w-[40%]">IMAGE</div>
      </div>

      <div className="mx-50 mt-10 flex gap-10">
        {/* RECENT UPLOADS */}
        <div className="w-[60%]">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl">Recent Uploads</h2>
            <p className="text-[#1152D4] text-lg font-semibold">View All</p>
          </div>

          <div className="grid grid-cols-2 bg-[#ababf0] rounded-xl">
            <div className="grid grid-cols-[auto_1fr]">
              <div className="px-10">PDF</div>
              <div className="">
                <h3 className="font-bold">Applied Mathematics III</h3>
                <p>
                  <span>Math 2101</span>
                  <span>. Freshman Department</span>
                </p>
                <div>
                  <p className='flex items-center gap-5'>
                    {/* 1.2K */}
                    <p className='flex items-center gap-1'>
                      <FontAwesomeIcon icon={faEye} />
                      <span>1.2K</span>
                    </p>
                    {/* 450 Download */}
                    <p className='flex items-center gap-1'>
                      <FontAwesomeIcon icon={faDownload} />
                      <span>450</span>
                    </p>
                  </p>
                  <p></p>
                </div>
              </div>
            </div>









            <div className="grid grid-cols-[auto_1fr]">
              <div className="bg-yellow-400 px-10">PDF</div>
              <div className="bg-red-400">
                <h3>Applied Mathematics III</h3>
                <p>
                  <span>Math 2101</span>
                  <span>. Freshman Department</span>
                </p>
                <div>
                  <p>
                    {/* 1.2K */}
                    <span></span>
                    {/* 450 Download */}
                    <span></span>
                  </p>
                  <p></p>
                </div>
              </div>
            </div>



            
          </div>        
        </div>

        {/* CONTINUE READING */}
        <div className="bg-blue-400 w-[40%]">hi</div>
      </div>
    </>
  );
};

export default Home;
