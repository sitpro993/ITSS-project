import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Requests from "./list";
import { apiGetStudentRequest } from "../../apis/job";

export const CompanyRequestsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((s) => s.auth.user);

  useEffect(() => {
    const getApi = async () => {
      console.log(userInfo)
      if (userInfo) {
        setLoading(true);
        const response = await apiGetStudentRequest(userInfo._doc._id);
        if (response && response.data) {
          setData(response.data);
        }
        setLoading(false);
      }
    };
    getApi();
  }, [userInfo]);

  return <> {data ? <Requests requests={data} loading={loading} /> : null}</>;
};
