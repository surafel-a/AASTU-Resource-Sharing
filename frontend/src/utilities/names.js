export const splitName = (fullName) => {
  if (!fullName) return "Student";

  const firstName = fullName.split(" ")[0];
  return firstName;
};

export const formatDepartment = (department) => {
  if (!department) return "N/A";

  const depts = {
    "Electrical Engineering": "ECEg",
    "Electromechanical Engineering": "EME",
    "Mechanical Engineering": "ME",
    "Civil Engineering": "CE",
    "Chemical Engineering": "ChE",
    "Software Engineering": "SE",
    "Environmental Engineering": "EnE",
    Architecture: "Arch",
    "Mining Engineering": "MEng",
    Biotechnology: "BioTech",
    "Food Science": "FS",
  };

  return depts[department] || department;
};
