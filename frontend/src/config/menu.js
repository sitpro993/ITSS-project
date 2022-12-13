import { ROLE } from "../constant/role";
import { ROUTE } from "../constant/route";

export const mainMenu = [
    {
        label: "Subscriber List",
        link: ROUTE.STUDENT_REQUESTS,
        role: [ROLE.COMPANY]
    },
    {
        label: "Post job",
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
    
]