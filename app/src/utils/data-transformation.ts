import { maximumAmountOfSemesters } from "@/schemas/auth/userData.validation";

export const transformSemesterToString = (semester: number, includePostfix: boolean): string =>
{
  const addPostfix = (semesterString: string): string =>
  {
    if(includePostfix)
    {
      return semesterString + ". Semester";
    }
    else
    {
      return semesterString;
    }
  };

  if(semester === 0)
  {
    return "Referendariat";
  }
  else if(semester === maximumAmountOfSemesters)
  {
    return addPostfix(`> ${maximumAmountOfSemesters - 1}`);
  }
  else
  {
    return addPostfix(String(semester));
  }
};
