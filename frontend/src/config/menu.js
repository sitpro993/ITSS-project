import { ROLE } from "../constant/role";
import { ROUTE } from "../constant/route";

export const mainMenu = [
    {
        label: "Danh sách đăng ký",
        link: ROUTE.STUDENT_REQUESTS,
        role: [ROLE.COMPANY]
    },
    {
        label: "Danh sách thực tập sinh",
        link: ROUTE.INTERNSHIP_STUDENTS,
        role: [ROLE.COMPANY]
    },
    {
        label: "Đăng công việc",
        link: ROUTE.POST_JOB,
        role: [ROLE.COMPANY]
    },
    {
        label: "Company information",
        link: ROUTE.COMPANY,
        role: [ROLE.STUDENT]
    },
    {
        label: "Apply internship",
        link: ROUTE.APPLY_INTERNSHIP,
        role: [ROLE.STUDENT]
    },
    {
        label: "Request",
        link: ROUTE.COMPANY_REQUESTS,
        role: [ROLE.STUDENT]
    },
    {
        label: "Occupation",
        link: ROUTE.OCCUPATION,
        role: [ROLE.STUDENT]
    }
    
]