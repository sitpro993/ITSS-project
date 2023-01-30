import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOccupationDetail } from "../../apis/occupation";

export default function OccupationDetail() {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const getOccupationDetailData = async () => {
      if (id) {
        const result = await getOccupationDetail(id);
        if (result.data) {
          setData(result.data);
        }
      }
    };
    getOccupationDetailData();
  }, [id]);

  return (
    <>
      {data && (
        <>
          <h1>{data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.post }} />
        </>
      )}
    </>
  );
}
