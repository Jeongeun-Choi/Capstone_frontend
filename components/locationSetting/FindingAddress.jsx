import React, { useCallback, useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from '@emotion/styled';
import { Modal, Input } from 'antd';
import { basicStyle } from '../../public/style';

const { Search } = Input;

const SearchInput = styled(Search)`
  ${basicStyle}
  width: 90%;
`;

const FindingAddress = ({ locations, setLocations }) => {
  const [showingScreen, setShowingScreen] = useState(false);

  const handleSearch = useCallback(() => {
    setShowingScreen(prev => !prev);
  }, []);

  const handleCancel = useCallback(() => {
    setShowingScreen(prev => !prev);
  }, []);

  const searchAddress = useCallback(
    data => {
      let sido = ''; //도/시 이름
      let sigungu = ''; // 시/군/구 이름
      let bname = ''; // 동 이름
      sido = data.sido;
      sigungu = data.sigungu;
      bname = data.bname;

      setLocations([...locations, bname]);
      setShowingScreen(prev => !prev);
    },
    [locations]
  );

  return (
    <>
      <SearchInput placeholder="지역을 입력해주세요" onSearch={handleSearch} />
      <Modal
        visible={showingScreen}
        onCancel={handleCancel}
        footer={null}
        weight={600}
      >
        <DaumPostcode onComplete={searchAddress} height={500} style={{}} />
      </Modal>
    </>
  );
};

export default FindingAddress;