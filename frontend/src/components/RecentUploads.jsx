import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faDownload, faFilePdf, faFileWord } from '@fortawesome/free-solid-svg-icons'

const RecentUploads = ({ icon, course, department, views, downloads, fileExtension }) => {
  return (
    <div className="grid grid-cols-[auto_1fr] bg-white shadow-lg py-5 rounded-xl">
      <div className="px-5 py-2">
        <FontAwesomeIcon icon={icon} className='text-[#1152D4] text-5xl' />
      </div>
      <div className="pr-5">
        <h3 className="font-bold text-xl">{course}</h3>
        <p className='mb-5'>
          <span>Math 2101</span>
          <span>. {department}</span>
        </p>
        <div className='flex justify-between items-center'>
          <p className='flex items-center gap-5'>
            {/* 1.2K */}
            <p className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faEye} />
              <span>{views}</span>
            </p>
            {/* 450 Download */}
            <p className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faDownload} />
              <span>{downloads}</span>
            </p>
          </p>
          <p className='bg-[#e4e4ee] font-semibold px-4 py-1 rounded-md'>{fileExtension}</p>
        </div>
      </div>
    </div> 
  )
}

export default RecentUploads
