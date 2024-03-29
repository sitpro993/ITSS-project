import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { selectCompanyDetail } from "../../redux/selector/companySelector.js";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCompanyDetail } from "../../redux/thunks/companyThunk.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CompanyDetails() {
  const { data } = useSelector(selectCompanyDetail);
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const companyID = useParams();
  console.log(companyID.id);

  useEffect(() => {
    dispatch(fetchCompanyDetail({ id: companyID.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // console.log(selectedCompany)

  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-8 px-24 bg-slate-100 flex justify-start space-x-2">
        <div className="w-[850px] flex space-x-[24px]">
          <img
            src={data?.logo}
            alt="LogoUrl"
            className="w-[110px] h-[110px] object-contain rounded-lg bg-white"
          />
          <div className="flex flex-col justify-between space-y-4">
            <h1 class="font-medium text-[26px]" title="full_name">
              {data?.full_name}
            </h1>
            <div className="text-slate-800 space-x-4 flex items-center">
              <div class="space-x-2 flex items-center">
                <svg
                  width="13"
                  height="17"
                  viewBox="0 0 13 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.49973 0C2.91572 0 0 2.91611 0 6.50051C0 9.06172 1.07228 11.6525 3.10093 13.9927C4.61613 15.7407 6.11772 16.731 6.18096 16.7723C6.27777 16.8356 6.38879 16.8673 6.49981 16.8673C6.61075 16.8673 6.72177 16.8356 6.81865 16.7723C6.88181 16.731 8.38364 15.7407 9.89884 13.9928C11.9276 11.6525 13 9.06172 13 6.50051C12.9999 2.91611 10.0839 0 6.49973 0ZM6.49973 15.5691C5.30431 14.6783 1.16535 11.25 1.16535 6.50051C1.16535 3.55868 3.55829 1.16535 6.49973 1.16535C9.44139 1.16535 11.8346 3.55868 11.8346 6.50051C11.8346 11.25 7.69523 14.6783 6.49973 15.5691Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M6.49971 3.91943C5.0772 3.91943 3.91992 5.07679 3.91992 6.49945C3.91992 7.92173 5.0772 9.07885 6.49971 9.07885C7.92222 9.07885 9.07941 7.92173 9.07941 6.49945C9.07941 5.07686 7.92214 3.91943 6.49971 3.91943ZM6.49971 7.91349C5.71977 7.91349 5.08528 7.27915 5.08528 6.49945C5.08528 5.71936 5.71977 5.08479 6.49971 5.08479C7.27956 5.08479 7.91406 5.71936 7.91406 6.49945C7.91406 7.27915 7.27956 7.91349 6.49971 7.91349Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span>{data?.city}</span>
                <div class="space-x-2 flex items-center">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.4994 9.48709C8.44274 9.48709 8.38607 9.47681 8.33153 9.45626L0.363171 6.49129C0.084809 6.38851 -0.0653504 6.05248 0.0274368 5.74175C0.119516 5.43102 0.421251 5.26261 0.699613 5.36698L8.4994 8.26869L16.2999 5.36619C16.579 5.2634 16.8793 5.43102 16.9721 5.74096C17.0649 6.05168 16.9147 6.38771 16.6363 6.49129L8.66798 9.45626C8.61273 9.47681 8.55607 9.48709 8.4994 9.48709Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M15.0513 15.8142H1.94782C0.873331 15.8142 0 14.8393 0 13.6399V4.54735C0 3.34793 0.873331 2.37305 1.94782 2.37305H15.0513C16.1258 2.37305 16.9991 3.34793 16.9991 4.54735V13.6399C16.9991 14.8393 16.1258 15.8142 15.0513 15.8142ZM1.94782 3.55903C1.4598 3.55903 1.06245 4.00259 1.06245 4.54735V13.6399C1.06245 14.1847 1.4598 14.6282 1.94782 14.6282H15.0513C15.5393 14.6282 15.9367 14.1847 15.9367 13.6399V4.54735C15.9367 4.00259 15.5393 3.55903 15.0513 3.55903H1.94782Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M10.8012 3.55798C10.5079 3.55798 10.27 3.29232 10.27 2.96499V1.38366C10.27 1.27455 10.1906 1.18599 10.0929 1.18599H6.90554C6.80779 1.18599 6.72846 1.27455 6.72846 1.38366V2.96499C6.72846 3.29232 6.49047 3.55798 6.19724 3.55798C5.904 3.55798 5.66602 3.29232 5.66602 2.96499V1.38366C5.66602 0.62067 6.22203 0 6.90554 0H10.0929C10.7764 0 11.3324 0.62067 11.3324 1.38366V2.96499C11.3324 3.29232 11.0944 3.55798 10.8012 3.55798Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span>{data?.field}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="py-1 px-5 bg-blue-300 opacity-100 text-blue-800 font-medium rounded-full">
                {data.positions?.length} Công việc
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center space-x-4 py-4">
        <Box className="w-10/12 space-y-4" sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Thông tin công ty" {...a11yProps(0)} />
              <Tab label="Danh sách công việc tuyển dụng" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <section className="flex justify-start space-x-4 py-4">
              <div className="w-[850px] space-y-4">
                <div className="space-y-4">
                  <h2 className="text-xl font-medium">Mô tả chi tiết</h2>
                  <p className="text-gray-700 leading-7 whitespace-pre-line text-justify">
                    {data?.description}
                  </p>
                  <div className="flex flex-wrap py-2"></div>
                </div>
              </div>
              <div className="w-[360px] space-y-4">
                <div className="bg-slate-100 p-6 space-y-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <span className="font-semibold">Tên viết tắt:</span>
                    <span className="text-slate-800 text-right">
                      {data?.short_name}
                    </span>
                    {/* <span className="font-semibold">Số lượng nhân sự:</span>
                    <span className="text-slate-800 text-right">
                      {data?.required_employees}
                    </span> */}
                    <span className="font-semibold">Năm thành lập:</span>
                    <span className="text-slate-800 text-right">
                      {data?.created_time}
                    </span>
                    <span className="font-semibold">Email:</span>
                    <span className="text-slate-800 text-right truncate">
                      {data?.email}
                    </span>
                    <span className="font-semibold">Tỉnh thành phố:</span>
                    <span className="text-slate-800 text-right">
                      Thành phố Hồ Chí Minh
                    </span>
                  </div>
                </div>
                <div className="bg-slate-100 p-4 space-y-4 rounded-lg">
                  <div className="text-18 font-semibold">Địa chỉ công ty</div>
                  <p className="text-slate-800">{data?.address}</p>
                </div>
              </div>
            </section>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* Danh sách công việc tuyển dụng */}
            {data.positions?.map((position) => (
              <div className="space-y-4 pt-4">
                <div
                  class="p-4 border-3 border-gray-200 border-solid rounded-lg shadow-lg block space-y-4"
                  href=""
                >
                  <h3 class="text-18 font-semibold">{position?.name}</h3>
                  <div class="text-grey space-x-4 flex items-center">
                    <div class="space-x-4">
                      {/* <svg
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_855_12050)">
                          <path
                            d="M15.5032 2.63602C13.8013 0.936176 11.5385 0 9.13169 0C6.72488 0 4.46213 0.936176 2.76021 2.63602C1.05837 4.33593 0.121094 6.59602 0.121094 9C0.121094 11.404 1.05837 13.6641 2.76021 15.364C4.46213 17.0638 6.72488 18 9.13169 18C10.7794 18 12.3916 17.5515 13.794 16.703C14.1266 16.5018 14.2329 16.0694 14.0314 15.7373C13.83 15.4051 13.3971 15.299 13.0646 15.5002C11.8821 16.2156 10.5222 16.5938 9.13169 16.5938C4.93955 16.5938 1.529 13.1872 1.529 9C1.529 4.81279 4.93955 1.40625 9.13169 1.40625C13.3238 1.40625 16.7344 4.81279 16.7344 9C16.7344 10.4973 16.2886 11.9547 15.4452 13.2147C15.2291 13.5375 15.316 13.9742 15.6392 14.19C15.9624 14.4058 16.3996 14.3191 16.6156 13.9963C17.6144 12.5042 18.1423 10.7765 18.1423 9C18.1423 6.59602 17.205 4.33593 15.5032 2.63602Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M9.1321 2.67188C8.7433 2.67188 8.42814 2.98666 8.42814 3.375V8.70877L5.84682 11.2871C5.57189 11.5616 5.57189 12.0068 5.84682 12.2814C5.98427 12.4187 6.16441 12.4874 6.34459 12.4874C6.52476 12.4874 6.7049 12.4187 6.84235 12.2814L9.62986 9.49718C9.76189 9.36534 9.83605 9.18647 9.83605 9V3.375C9.83605 2.98666 9.52089 2.67188 9.1321 2.67188Z"
                            fill="currentColor"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_855_12050">
                            <rect
                              width="18.0212"
                              height="18"
                              fill="white"
                              transform="translate(0.121094)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg> */}
                      <h4>Mô tả công việc: </h4>
                      <span>{position?.description}</span>
                      <br/>
                      <h4>Lợi ích: </h4>
                      <span>{position?.benefit}</span>
                      <h4>Yêu cầu kỹ năng: </h4>
                      <span>{position?.required_skills}</span>
                      <h4>Số lượng: </h4>
                      <span>{position?.required_employees}</span>
                      <br/>
                    </div>
                    
                    <div class="space-x-4 flex items-center">
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.9649 13.9154C24.9649 13.9153 24.9649 13.9153 24.9648 13.9151L20.2447 2.06337C20.1445 1.81155 19.8591 1.68861 19.6073 1.78879C19.6071 1.78885 19.6069 1.78891 19.6067 1.78904L0.457876 9.41392C0.379784 9.44766 0.31206 9.50152 0.261573 9.56998C0.102323 9.65274 0.00171765 9.81652 0 9.99596V22.7556C0 23.0266 0.219736 23.2464 0.490757 23.2464H21.1025C21.3736 23.2464 21.5933 23.0266 21.5933 22.7556V15.7869L24.6909 14.5531C24.9427 14.4527 25.0653 14.1672 24.9649 13.9154ZM20.6118 22.2649H0.981513V10.4867H20.6118V22.2649ZM8.18827 9.50765L16.4055 6.23333C17.1389 7.00418 18.1551 7.44231 19.219 7.44648L20.0386 9.50765H8.18827ZM21.5933 14.7327V9.99596C21.5933 9.72494 21.3736 9.5052 21.1025 9.5052H21.0947L20.0548 6.89339C20.0432 6.87162 20.0298 6.85088 20.0145 6.83156C19.9619 6.5952 19.743 6.43392 19.5017 6.45368C18.5117 6.54391 17.5433 6.12689 16.9286 5.34555C16.7757 5.15679 16.5069 5.10986 16.299 5.23562C16.2757 5.23838 16.2526 5.24267 16.2298 5.24838L6.19777 9.24314C6.07636 9.29074 5.97926 9.38515 5.92834 9.5052H2.88172L19.5144 2.88244L23.8719 13.8239L21.5933 14.7327Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M2.31329 18.9518C3.26609 19.2334 4.01168 19.9781 4.29448 20.9305C4.35649 21.1384 4.54771 21.2809 4.76462 21.2809C4.79008 21.2793 4.81535 21.2755 4.8402 21.2696C4.86222 21.2759 4.88473 21.2805 4.90743 21.2834H16.6856C16.7058 21.2807 16.7258 21.2766 16.7455 21.2711C16.9907 21.3307 17.2378 21.1804 17.2974 20.9352C17.2976 20.9343 17.2979 20.9334 17.2981 20.9325C17.5801 19.9791 18.3258 19.2334 19.2792 18.9513C19.5104 18.8806 19.6541 18.6502 19.6159 18.4115C19.6225 18.3877 19.6272 18.3634 19.6301 18.3388V14.4128C19.6272 14.3882 19.6223 14.3639 19.6154 14.3402C19.6539 14.1013 19.5101 13.8708 19.2787 13.8003C18.3253 13.5183 17.5798 12.7723 17.2985 11.8187C17.2275 11.5859 16.9948 11.4418 16.7548 11.482C16.7321 11.4757 16.709 11.4711 16.6856 11.4683H4.90743C4.88271 11.4712 4.85823 11.4761 4.83431 11.483C4.59562 11.445 4.36533 11.5886 4.29448 11.8196C4.01223 12.7729 3.26659 13.5183 2.31329 13.8003C2.08208 13.871 1.93841 14.1014 1.97663 14.3402C1.97025 14.364 1.96565 14.3883 1.96289 14.4128V18.3388C1.96571 18.3619 1.97031 18.3847 1.97663 18.4071C1.93639 18.6473 2.08037 18.8803 2.31329 18.9518ZM2.9444 14.612C3.92984 14.2162 4.71088 13.4352 5.10668 12.4498H16.4859C16.8818 13.4352 17.6631 14.2162 18.6486 14.612V18.1396C17.6635 18.5358 16.8826 19.3167 16.4863 20.3019H5.10668C4.71045 19.3167 3.92954 18.5358 2.9444 18.1396V14.612Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M10.7961 19.3202C12.4223 19.3202 13.7406 18.0019 13.7406 16.3757C13.7406 14.7494 12.4223 13.4312 10.7961 13.4312C9.16986 13.4312 7.85156 14.7494 7.85156 16.3757C7.85316 18.0012 9.17053 19.3186 10.7961 19.3202ZM10.7961 14.4127C11.8802 14.4127 12.7591 15.2915 12.7591 16.3757C12.7591 17.4598 11.8802 18.3387 10.7961 18.3387C9.71196 18.3387 8.83308 17.4598 8.83308 16.3757C8.83308 15.2915 9.71196 14.4127 10.7961 14.4127Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M5.39824 17.1119C5.80477 17.1119 6.13438 16.7823 6.13438 16.3758C6.13438 15.9693 5.80477 15.6396 5.39824 15.6396C4.99171 15.6396 4.66211 15.9693 4.66211 16.3758C4.66211 16.7824 4.99171 17.1119 5.39824 17.1119ZM5.39824 16.1304C5.53375 16.1304 5.64362 16.2403 5.64362 16.3758C5.64362 16.5113 5.53375 16.6212 5.39824 16.6212C5.26273 16.6212 5.15287 16.5113 5.15287 16.3758C5.15287 16.2403 5.26273 16.1304 5.39824 16.1304Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M16.1951 17.1119C16.6016 17.1119 16.9313 16.7823 16.9313 16.3758C16.9313 15.9693 16.6016 15.6396 16.1951 15.6396C15.7886 15.6396 15.459 15.9693 15.459 16.3758C15.459 16.7824 15.7886 17.1119 16.1951 17.1119ZM16.1951 16.1304C16.3306 16.1304 16.4405 16.2403 16.4405 16.3758C16.4405 16.5113 16.3306 16.6212 16.1951 16.6212C16.0596 16.6212 15.9497 16.5113 15.9497 16.3758C15.9497 16.2403 16.0596 16.1304 16.1951 16.1304Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <span>{position.salary}đ / month</span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="py-1 px-4 bg-blue-300 opacity-100 text-blue-800 rounded-full">
                      Part time
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </TabPanel>
        </Box>
      </section>
    </div>
  );
}

export default CompanyDetails;
