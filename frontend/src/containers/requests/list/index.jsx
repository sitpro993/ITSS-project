import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ResponsiveAppBar from './app-bar';
import Requests from './list';
import { selectRequestList } from '../../../redux/selector/requestSelector';
import { fetchRequests } from '../../../redux/thunks/requestThunk';

export const RequestsList = () => {
  const dispatch = useDispatch();
    const { data, loading } = useSelector(selectRequestList);

    useEffect(() => {
      dispatch(fetchRequests());
    }, [dispatch]);

  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        height: '110vh',
      }}
    >
      <ResponsiveAppBar />
      <Requests requests={data} loading={loading} />
    </div>
  );
};
