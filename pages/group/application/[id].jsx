import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import customAxios from '../../../utils/baseAxios';
import Header from '../../../components/main/Header';
import Application from '../../../components/group/Application';
import ApplyModal from '../../../components/group/ApplyModal';

const GroupApplicationContainer = styled.div`
  width: 100%;

  & .application {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const GroupApplication = () => {
  const router = useRouter();
  const groupId = router.query.id;
  const [applications, setApplications] = useState([]);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedApply, setSelectedApply] = useState([]);

  const toggleApply = (data, userInfo) => {
    setSelectedApply({ ...data, userInfo });
    setShowApplication(prev => !prev);
  };

  const getApplications = async () => {
    const { data } = await customAxios.get(`/apply-member/${groupId}`);
    setApplications(data.members);
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <>
      <GroupApplicationContainer>
        <Header type="white" title="지원서 관리" />
        {applications.map(application => (
          <div className="application">
            <Application
              key={application.id}
              application={application}
              toggleApply={toggleApply}
              setApplications={setApplications}
              applications={applications}
            />
          </div>
        ))}
      </GroupApplicationContainer>
      {showApplication && (
        <ApplyModal
          selectedApply={selectedApply}
          toggleApply={toggleApply}
          type="member"
        />
      )}
    </>
  );
};

export default GroupApplication;
