import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 2.5rem 0 8.75rem;
`;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
  h2 {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
  }
`;
export const PaymentProcess = styled.div`
  display: flex;
  align-items: center;
  color: #999;
  font-weight: 400;
  span:last-child {
    color: #000;
    font-weight: 600;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 6.25rem;
  svg {
    margin-bottom: 40px;
  }
  p {
  }
`;
export const Message = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

export const OrderNumber = styled.p`
  font-size: 16px;
  margin-top: 40px;
  margin-bottom: 24px;
`;

export const GuideText = styled.p`
  font-size: 14px;
  color: #999;
  line-height: 24px;
  text-align: center;
  margin-bottom: 48px;
`;
export const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export const ToOrderlistLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 48px;
  border-radius: 24px;
  background: #000;
  color: #fff;
`;
export const ToHomeLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 48px;
  border-radius: 24px;
  border: 1px solid #000;

  background: #fff;
`;
