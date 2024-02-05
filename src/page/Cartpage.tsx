import * as S from '../../src/styledComponent/styledCart/StCart';
import PaymentInfo from 'components/Cart/PaymentInfo';
import CartListInfo from 'components/Cart/CartListInfo';
import ProgressIndicator from 'components/Cart/ProgressIndicator';
import useCartList from 'hooks/useCartList';
import { TypeCart } from 'Type/TypeInterface';
import CartEmpty from 'components/Cart/CartEmpty';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';

//총금액을 계산하는 로직
const getTotalPrice = (cartList: TypeCart[]) => {
  let totalPrice = 0;
  for (let i = 0; i < cartList.length; i++) {
    totalPrice += cartList[i].price * cartList[i].quantity;
  }
  return totalPrice;
};

const Cartpage = () => {
  const { cartList, setCartList } = useCartList();
  const totalPrice = getTotalPrice(cartList);

  //주문금액이 5만원이하면 배송비 3000원붙음
  const shippingCost = totalPrice <= 50000 ? 3000 : 0;
  const totalPayment = totalPrice + shippingCost;
  const title = '장바구니';

  return (
    <S.CartContainer>
      {cartList.length == 0 ? (
        <CartEmpty />
      ) : (
        <S.Cart>
          <ProgressIndicator title={title} />
          <S.Wrapper>
            <CartListInfo
              cartList={cartList}
              setCartList={setCartList}
              totalPrice={totalPrice}
              shippingCost={shippingCost}
              totalPayment={totalPayment}
              cartAndPayment={true}
            />
            <PaymentInfo
              cartList={cartList}
              totalPrice={totalPrice}
              shippingCost={shippingCost}
              totalPayment={totalPayment}
              cartAndPayment={false}
            />
          </S.Wrapper>
        </S.Cart>
      )}
    </S.CartContainer>
  );
};

export default Cartpage;
