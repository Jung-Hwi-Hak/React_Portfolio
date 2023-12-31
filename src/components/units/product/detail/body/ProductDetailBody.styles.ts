import styled from "@emotion/styled";
import { ShoppingOutlined } from "@ant-design/icons";
interface UploadImgProps {
  focusImg: number;
}

export const Body = styled.div`
  width: 100%;
`;

export const ProductInfoWrapper = styled.div`
  position: relative;
  height: 150px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
`;
export const ProductInfoSubWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;
export const Remarks = styled.span`
  color: #bdbdbd;
  font-size: 18px;
  font-weight: 500;
  line-height: 26.64px;
  margin-bottom: 4px;
`;

export const Name = styled.h2`
  color: #4f4f4f;
  font-weight: bold;
  margin-bottom: 15px;
  line-height: 35.52px;
`;

export const Price = styled.h1`
  font-family: Noto Sans CJK KR;
  font-size: 36px;
  font-weight: 700;
  line-height: 53px;
  letter-spacing: 0em;
  text-align: left;
`;

export const Contents = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 26.64px;
  margin-bottom: 40px;
  min-height: 150px;
`;

export const IWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  top: 0;
  color: #ffd700;
`;

export const PickIcon = styled(ShoppingOutlined)`
  font-size: 36px;

  cursor: pointer;
`;

export const PickCount = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const SlideUploadImage = styled.img`
  position: relative;
  transform: translateX(-50%);
  left: 50%;
  max-width: 300px;
  min-width: 300px;
  max-height: 300px;
  min-height: 300px;
  margin: 15px 0;
  padding: 4px;
  border: 3px solid #ffd700;
  border-radius: 15px;
`;

export const UploadImageWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  margin-top: 36px;
  margin-bottom: 80px;
`;

export const UploadImage = styled.img<UploadImgProps>`
  position: relative;
  max-width: 80px;
  min-width: 80px;
  max-height: 80px;
  min-height: 80px;
  margin: 15px 0;
  padding: 4px;
  border-radius: 15px;

  &.product_imgs:nth-of-type(${(props) => props.focusImg}) {
    border: 3px solid #ffd700;
  }
`;
export const Tag = styled.span`
  width: 100%;
  display: block;
  color: #bdbdbd;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 40px;
`;

export const Line = styled.hr`
  margin: 30px 0;
`;
