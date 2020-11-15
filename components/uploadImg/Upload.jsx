import React, { useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import customAxios from '../../utils/baseAxios';

const UploadImage = styled.div`
  & .upload-image-container {
    display: flex;
  }
  & .upload-image-button {
    border: 1px dashed #bfc7ce;
    border-radius: 5px;
    color: #bfc7ce;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-right: 10px;
    padding: 5px;
    width: 120px;
    height: 120px;
    cursor: pointer;
  }
  & .preview-image {
    display: flex;
    margin-top: 5px;
    & .img-border {
      width: 120px;
      height: 120px;
      border: 1px solid #bfc7ce;
      border-radius: 4px;
      margin-right: 10px;
      & .delete-icon {
        font-size: 12px;
        text-align: right;
        margin-left: 5px;
      }
    }
    & img {
      margin-left: 15px;
      margin-bottom: 10px;
    }
  }
`;

const Upload = ({ images, setImages }) => {
  const imageInput = useRef();

  //이미지 삭제
  const deleteImage = useCallback(
    url => async () => {
      const imageFormData = new FormData();
      imageFormData.append('url', url);
      try {
        // customAxios.post('/pic/delete', imageFormData, {
        //   headers: { Authorization: `Bearer ${getCookie()}` }
        // });
        await customAxios.post('/pic/delete', imageFormData);
        setImages(images.filter(image => image.URL != url));
      } catch (e) {
        console.error(e);
      }
    },
    [images]
  );

  const onChangeImages = useCallback(async e => {
    const imageFormData = new FormData();
    const description = e.target.files[0].name;
    imageFormData.append('images', e.target.files[0]);
    try {
      //TODO: 쿠키 보내줘야할 때 주석 해제하고 쓸 것.
      // const result = await customAxios.post('/images', imageFormData, {
      //   headers: { Authorization: `Bearer ${getCookie()}` }
      // });
      const result = await customAxios.post('/images', imageFormData);
      const urls = result.data.urls.reduce((acc, url) => {
        acc.push({ URL: url, description });
        return acc;
      }, []);

      setImages(prev => [...prev, ...urls]);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <UploadImage>
      <div className="upload-image-container">
        <input type="file" hidden ref={imageInput} onChange={onChangeImages} />
        <div className="upload-image-button" onClick={onClickImageUpload}>
          <PlusCircleOutlined style={{ fontSize: 25 }} />
          <div style={{ fontSize: 23 }}>UPLOAD</div>
        </div>
        <div className="preview-image">
          {images.map((image, i) => {
            return (
              <div key={image.URL} className="img-border">
                <div className="delete-icon" onClick={deleteImage(image.URL)}>
                  <CloseOutlined />
                </div>
                <img
                  src={image.URL}
                  alt={image.description}
                  width="90"
                  height="90"
                />
              </div>
            );
          })}
        </div>
      </div>
    </UploadImage>
  );
};

export default Upload;
