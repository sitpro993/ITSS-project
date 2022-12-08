import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Requests from "./list";
import { selectRequestList } from "../../redux/selector/requestSelector";
import { fetchRequests } from "../../redux/thunks/requestThunk";

export const CompanyRequestsList = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectRequestList);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  return <Requests requests={data} loading={loading} />;
};
