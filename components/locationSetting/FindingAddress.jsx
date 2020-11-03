import React, { useCallback, useState } from 'react';
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
      if (typeof locations === 'string') {
        const address = data.address;
        setLocations(address);
      } else {
        let sido = ''; //도/시 이름
        let sigungu = ''; // 시/군/구 이름
        let bname = ''; // 동 이름
        sido = data.sido;
        sigungu = data.sigungu;
        bname = data.bname;

        const location = { sido, sigungu, bname };
        setLocations([...locations, location]);
      }
      setShowingScreen(prev => !prev);
    },
    [locations]
  );

  return (
    <>
      <SearchInput
        placeholder="지역을 입력해주세요"
        onClick={handleSearch}
        onSearch={handleSearch}
      />
      <Modal
        visible={showingScreen}
        onCancel={handleCancel}
        footer={null}
        weight={600}
      >
        <DaumPostcode onComplete={searchAddress} height={500} />
      </Modal>
    </>
  );
};

export default FindingAddress;
