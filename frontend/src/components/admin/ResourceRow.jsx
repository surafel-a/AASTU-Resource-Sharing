const ResourceRow = () => {
  return (
    <>
      <div className="flex items-center gap-4 p-6">
        <div>
          <FontAwesomeIcon
            icon={fileIcon}
            className={`text-3xl rounded-xl p-3 ${fileTypeStyles[fileType]}`}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{fileName}</h2>
          <div className="flex items-center gap-2 text-lg font-semibold text-black/50">
            <p>{fileSize}</p>
            <p>. {fileType}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="inline font-bold text-xl text-black/50 px-4 py-1 rounded-md bg-[#e4e4e9]">
          {category}
        </p>
      </div>

      <p className="inline p-6 text-xl font-bold text-black/50">
        {dateUploaded}
      </p>

      <div className="p-6">
        <p
          className={`inline font-bold text-xl px-4 py-1 rounded-md ${statusStyles[status]}`}
        >
          <span className="">.</span> {status}
        </p>
      </div>
      <button className="p-6 cursor-pointer">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
      <div className="col-span-5 border border-black/10"></div>
    </>
  );
};

export default ResourceRow;
