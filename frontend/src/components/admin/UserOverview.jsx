const UserOverview = ({ title, value, description }) => {
  return (
    <div className="p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md">
      <p className="text-xl font-semibold text-black/50">{title}</p>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">{value}</h2>
        <p className="px-1 py-0.5 text-lg font-semibold text-green-600 bg-green-100 rounded-lg">
          {description}
        </p>
      </div>
    </div>
  );
};

export default UserOverview;
