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
        label: "Danh sách công ty",
        link: ROUTE.COMPANY,
        role: [ROLE.STUDENT]
    },
    {
        label: "Đăng ký thực tập",
        link: ROUTE.APPLY_INTERNSHIP,
        role: [ROLE.STUDENT]
    },
    {
        label: "Yêu Cầu Của Bạn",
        link: ROUTE.COMPANY_REQUESTS,
        role: [ROLE.STUDENT]
    },
    {
        label: "Nghề nghiệp",
        link: ROUTE.OCCUPATION,
        role: [ROLE.STUDENT]
    }
    
]