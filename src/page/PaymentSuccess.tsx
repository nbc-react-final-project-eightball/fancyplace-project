import useCartList from 'hooks/useCartList';
import * as S from '../styledComponent/styledPayment/stPaymentSuccess';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PaymentSuccess = () => {
  // 주문id를 url에서 가져와서 -> db 상태값을 결제 완료로 변경
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get('orderId');
  // const selectedItems: TypeCart[] = location.state?.selectedItems || [];
  const it = JSON.parse(sessionStorage.getItem('selectedItems') || '[]');
  const [selectedItems, setIt] = useState(it);

  const { cartList, updateOrderAndDeleteCart } = useCartList();
  console.log('orderId:', orderId);
  console.log('selectedItems:', selectedItems);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const it = JSON.parse(sessionStorage.getItem('selectedItems') || '[]');
      setIt(it);
      if (orderId) {
        updateOrderAndDeleteCart(orderId, selectedItems, cartList);
        console.log('orderId:', orderId);
        console.log('selectedItems:', selectedItems);
        console.log('cartList:', cartList);
      } else {
        console.error('orderId is null');
        navigate('/error');
      }
    } catch (e) {
      console.error(e);
    }
  }, [orderId]);

  useEffect(() => {
    console.log('selectedItems:', selectedItems);
  }, [selectedItems]);
  return (
    <S.Container>
      <S.TitleWrapper>
        <h2>주문완료</h2>
        <S.PaymentProcess>
          <span>장바구니</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6.00022 12C5.99991 11.8442 6.05416 11.6932 6.15355 11.5733L9.14022 7.99996L6.26022 4.41996C6.20484 4.35177 6.16348 4.27331 6.13853 4.18908C6.11358 4.10485 6.10551 4.01653 6.11481 3.92917C6.1241 3.84182 6.15056 3.75717 6.19268 3.68008C6.2348 3.60298 6.29173 3.53498 6.36022 3.47996C6.42841 3.42458 6.50687 3.38323 6.5911 3.35828C6.67532 3.33332 6.76365 3.32526 6.851 3.33455C6.93836 3.34384 7.02301 3.37031 7.1001 3.41242C7.17719 3.45454 7.2452 3.51148 7.30022 3.57996L10.5202 7.57996C10.6183 7.69925 10.6719 7.84888 10.6719 8.00329C10.6719 8.15771 10.6183 8.30734 10.5202 8.42663L7.18688 12.4266C7.13092 12.4941 7.06218 12.5499 6.98462 12.5908C6.90705 12.6317 6.82218 12.6569 6.73486 12.665C6.64755 12.673 6.5595 12.6638 6.47576 12.6378C6.39203 12.6117 6.31425 12.5694 6.24688 12.5133C6.17041 12.4513 6.10862 12.3731 6.06597 12.2843C6.02333 12.1955 6.00087 12.0984 6.00022 12Z"
              fill="#999999"
            />
          </svg>
          <span>주문결제</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6.00022 12C5.99991 11.8442 6.05416 11.6932 6.15355 11.5733L9.14022 7.99996L6.26022 4.41996C6.20484 4.35177 6.16348 4.27331 6.13853 4.18908C6.11358 4.10485 6.10551 4.01653 6.11481 3.92917C6.1241 3.84182 6.15056 3.75717 6.19268 3.68008C6.2348 3.60298 6.29173 3.53498 6.36022 3.47996C6.42841 3.42458 6.50687 3.38323 6.5911 3.35828C6.67532 3.33332 6.76365 3.32526 6.851 3.33455C6.93836 3.34384 7.02301 3.37031 7.1001 3.41242C7.17719 3.45454 7.2452 3.51148 7.30022 3.57996L10.5202 7.57996C10.6183 7.69925 10.6719 7.84888 10.6719 8.00329C10.6719 8.15771 10.6183 8.30734 10.5202 8.42663L7.18688 12.4266C7.13092 12.4941 7.06218 12.5499 6.98462 12.5908C6.90705 12.6317 6.82218 12.6569 6.73486 12.665C6.64755 12.673 6.5595 12.6638 6.47576 12.6378C6.39203 12.6117 6.31425 12.5694 6.24688 12.5133C6.17041 12.4513 6.10862 12.3731 6.06597 12.2843C6.02333 12.1955 6.00087 12.0984 6.00022 12Z"
              fill="#999999"
            />
          </svg>
          <span>주문완료</span>
        </S.PaymentProcess>
      </S.TitleWrapper>
      <S.ContentWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path
            d="M32 4C39.4261 4 46.548 6.94999 51.799 12.201C57.05 17.452 60 24.5739 60 32C60 39.4261 57.05 46.548 51.799 51.799C46.548 57.05 39.4261 60 32 60C24.5739 60 17.452 57.05 12.201 51.799C6.94999 46.548 4 39.4261 4 32C4 24.5739 6.94999 17.452 12.201 12.201C17.452 6.94999 24.5739 4 32 4ZM28.512 37.524L22.292 31.3C22.069 31.077 21.8043 30.9001 21.513 30.7795C21.2216 30.6588 20.9093 30.5967 20.594 30.5967C20.2787 30.5967 19.9664 30.6588 19.675 30.7795C19.3837 30.9001 19.119 31.077 18.896 31.3C18.4457 31.7503 18.1927 32.3611 18.1927 32.998C18.1927 33.6349 18.4457 34.2457 18.896 34.696L26.816 42.616C27.0384 42.8401 27.3029 43.018 27.5943 43.1394C27.8857 43.2607 28.1983 43.3232 28.514 43.3232C28.8297 43.3232 29.1423 43.2607 29.4337 43.1394C29.7251 43.018 29.9896 42.8401 30.212 42.616L46.612 26.212C46.838 25.9899 47.0177 25.7253 47.1409 25.4335C47.2641 25.1416 47.3283 24.8282 47.3298 24.5114C47.3312 24.1946 47.27 23.8806 47.1495 23.5876C47.029 23.2946 46.8517 23.0283 46.6278 22.8042C46.404 22.58 46.1379 22.4024 45.845 22.2816C45.5522 22.1608 45.2383 22.0991 44.9215 22.1002C44.6046 22.1013 44.2912 22.1652 43.9992 22.288C43.7071 22.4108 43.4423 22.5903 43.22 22.816L28.512 37.524Z"
            fill="var(--color-primary)"
          />
        </svg>
        <S.Message>결제가 완료되었습니다.</S.Message>
        <S.OrderNumber>주문번호 : 20240105009624</S.OrderNumber>
        <S.GuideText>
          해당 상품의 주문, 배송정보는 마이페이지 &gt; 주문조회에서 <br />
          자세히 확인하실 수 있습니다.
        </S.GuideText>
        <S.LinkWrapper>
          <S.ToOrderlistLink to={'/orderlist'}>구매내역 확인</S.ToOrderlistLink>
          <S.ToHomeLink to={'/'}>홈으로 돌아가기</S.ToHomeLink>
        </S.LinkWrapper>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default PaymentSuccess;
