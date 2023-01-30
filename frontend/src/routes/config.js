import PrivateRoute from "../components/routes/PrivateRoute";
import PublicRoute from "../components/routes/PublicRoute";
import { ROUTE } from "../constant/route";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/notFound";
import RegisterPage from "../pages/register";
import ApplyInternshipPage from "../pages/applyInternship";
import ProfilePage from "../pages/profile";
import { CompanyPage } from "../pages/company";
import { CompanyDetailsPage } from "../pages/companyDetails";
import PostJobPage from "../pages/postJob";
import { ROLE } from "../constant/role";
import { CompanyRequestsListPage } from "../pages/companyRequests";
import StudentRequestDetailPage from "../pages/studentRequestDetail";
import RegisteredStudentsPage from "../pages/registeredStudents";
import ManageOccupationPage from "../pages/manageOccupation";
import OccupationPage from "../pages/occupations";
import InternshipStudentsPage from "../pages/internshipStudents";
import OccupationDetailPage from "../pages/OccupationDetailPage";

export const routes = [
  // route chung
  {
    path: ROUTE.HOMEPAGE,
    element: HomePage,
    title: "Home",
    isPrivate: true,
    role: [ROLE.ADMIN, ROLE.STUDENT, ROLE.COMPANY]
  },
  {
    path: ROUTE.LOGIN,
    element: LoginPage,
    title: "Login",
  },
  {
    path: ROUTE.REGISTER,
    element: RegisterPage,
    title: "Register",
  },
  {
    path: ROUTE.PROFILE,
    title: "Student Profile",
    element: ProfilePage,
    isPrivate: true,
    role: [ROLE.STUDENT]
    
  },
  {
    path: "*",
    title: "404",
    is404: true,
    element: NotFoundPage,
  },

  // route student
  {
    path: ROUTE.COMPANY,
    element: CompanyPage,
    title: "Company",
    isPrivate: true,
    role: [ROLE.STUDENT]
  },
  {
    path: ROUTE.COMPANY_DETAIL,
    element: CompanyDetailsPage,
    title: "Detail Company",
    isPrivate: true,  
    role: [ROLE.STUDENT]
  },
  {
    path: ROUTE.APPLY_INTERNSHIP,
    element: ApplyInternshipPage,
    title: "Apply Internship",
    isPrivate: true,
    role: [ROLE.STUDENT]
  },
  {
    path: ROUTE.COMPANY_REQUESTS,
    element: CompanyRequestsListPage,
    title: "Company Requests",
    isPrivate: true,
    role: [ROLE.STUDENT]
  },
  {
    path: ROUTE.OCCUPATION,
    element: OccupationPage,
    title: "View Occupation",
    isPrivate: true,
    role: [ROLE.STUDENT]

  },
  {
    path: ROUTE.OCCUPATION_DETAIL,
    element: OccupationDetailPage,
    title: "Occupation Detail",
    isPrivate: true,
    role: [ROLE.STUDENT]
    
  },
  // route company
  {
    path: ROUTE.POST_JOB,
    element: PostJobPage,
    title: "Apply Internship",
    isPrivate: true,
    role: [ROLE.COMPANY]
  },
  {
    path: ROUTE.STUDENT_REQUESTS,
    element: RegisteredStudentsPage,
    title: "List registered students",
    isPrivate: true,
    role: [ROLE.COMPANY]
  },
  {
    path: ROUTE.STUDENT_REQUESTS_DETAIL,
    element: StudentRequestDetailPage,
    title: "Student Request Detail",
    isPrivate: true,
    role: [ROLE.COMPANY]
  },
  {
    path: ROUTE.REGISTERED_STUDENTS,
    element: RegisteredStudentsPage,
    title: "List registered students",
    isPrivate: true,
    role: [ROLE.COMPANY]
  },
  {
    path: ROUTE.INTERNSHIP_STUDENTS,
    element: InternshipStudentsPage,
    title: "List internship students",
    isPrivate: true,
    role: [ROLE.COMPANY]
  },
  //route admin 
  {
    path: ROUTE.MANAGE_OCCUPATION,
    element: ManageOccupationPage,
    title: "Manage occupation",
    isPrivate: true,
    role: [ROLE.ADMIN]
  }
].map((route) => {
  if (route.isPrivate) {
    return {
      ...route,
      element: (
        <PrivateRoute title={route.title}>
          <route.element />
        </PrivateRoute>
      ),
    };
  }
  return {
    ...route,
    element: (
      <PublicRoute title={route.title}>
        <route.element />
      </PublicRoute>
    ),
  };
});
