import useCartList from 'hooks/useCartList';
import * as S from '../styledComponent/styledCart/StCart';
import { useEffect, useState } from 'react';
import CartEmpty from 'components/Cart/CartEmpty';
import ProgressIndicator from 'components/Cart/ProgressIndicator';
import { useNavigate } from 'react-router-dom';
import { TypeCart } from 'Type/TypeInterface';
import { RootState } from 'redux/configStore';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedItems11 } from '../redux/modules/Cart/cartSlice';
const getSelectedTotalPrice = (cartList: TypeCart[]) => {
  let totalPrice = 0;
  cartList.forEach((cartItem) => {
    if (cartItem.selected) {
      totalPrice += cartItem.price * cartItem.quantity;
    }
  });
  return totalPrice;
};

const CartPage = () => {
  const [addd, seta] = useState(0);
  const {
    cartList,
    setCartList,
    changeCartListHandler,
    removeCartItemHandler,
  } = useCartList();
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<TypeCart[]>([]);
  const [a, setA] = useState<TypeCart[]>([]);
  const title = '장바구니';
  const dispatch = useDispatch();
  const selectedItems11 = useSelector(
    (state: RootState) => state.cartSlice.selectedItems,
  );
  const queryClient = useQueryClient();

  // 총 상품 금액 계산
  // 체크된 상품들만 총 금액의 합 계산
  const selectedTotalPrice = getSelectedTotalPrice(cartList);
  const totalPrice = selectedTotalPrice;

  // 주문금액이 5만원 이하면 배송비 3000원 추가
  const shippingCost = selectedTotalPrice <= 50000 ? 3000 : 0;
  const totalPayment = totalPrice + shippingCost;
  const navigate = useNavigate();

  //채크박스 하나씩 변하는 핸들러
  const checkboxChangeHanlder = (itemId: number) => {
    const updatedCartList = cartList.map((item) =>
      item.productId === itemId ? { ...item, selected: !item.selected } : item,
    );
    setCartList(updatedCartList);

    const selectedItems1 = updatedCartList.filter((item) => item.selected);
    setSelectedItems(selectedItems1);
    dispatch(setSelectedItems11(selectedItems1));
  };
  //체크박스 전체선택
  const selectAllChangeHandler = () => {
    const updatedCartList = cartList.map((item) => ({
      ...item,
      selected: !selectAll,
    }));
    setCartList(updatedCartList);
    setSelectAll(!selectAll);

    const selectedItems1 = updatedCartList.filter((item) => item.selected);
    setSelectedItems(selectedItems1);
    dispatch(setSelectedItems11(selectedItems1));
  };
  //장바구니 수량 추가
  const increaseQuantityHandler = (itemId: number) => {
    const updatedCartList = cartList.map((item) =>
      item.productId === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    changeCartListHandler(updatedCartList);
  };
  //장바구니 수량 감소
  const decreaseQuantityHandler = (itemId: number) => {
    const updatedCartList = cartList.map((item) =>
      item.productId === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    changeCartListHandler(updatedCartList); // 업데이트 함수로 변경
  };

  //결제페이지로 이동
  const paymentHandeler = () => {
    navigate('/payment', {
      state: { selectedItems },
    });
  };

  // 삭제 버튼 클릭 핸들러
  const removeSelectedItemsHandler = async () => {
    // 선택한 상품들의 ID 추출
    const selectedIds = selectedItems.map((item) => item.productId);

    // 각 선택한 상품을 삭제하는 로직
    selectedIds.forEach(async (itemId) => {
      await removeCartItemHandler(itemId);
    });

    //promise.All 한꺼번에 요청
    //forOf 하나씩순차적으로 요청할때

    // 선택 상태 초기화
    setSelectAll(false);
    setSelectedItems11([]);

    // 장바구니 데이터 다시 불러오기
    // 캐쉬를 전역상태로 관리하고있고
    //다시 갱신하라
    queryClient.invalidateQueries('cartList');
  };
  useEffect(() => {
    console.log('----------------------------');
    console.log('selectedItems11', selectedItems11);
    console.log('selectedItems', selectedItems);
  }, [selectedItems]);
  return (
    <S.CartContainer>
      {cartList.length == 0 ? (
        <CartEmpty />
      ) : (
        <S.Cart>
          <ProgressIndicator title={title} />
          <S.Wrapper>
            <S.LeftContainer>
              <div className="artistName">
                <input
                  type="checkbox"
                  id="checkboxTop"
                  checked={selectAll}
                  onChange={selectAllChangeHandler}
                />
                <label htmlFor="checkboxTop" />
                <span>전체선택</span>
              </div>

              <S.CartList>
                {cartList.map((cartItem) => (
                  <S.CartWrapper key={cartItem.id}>
                    <>
                      <input
                        type="checkbox"
                        id={`checkbox${cartItem.productId}`}
                        checked={cartItem.selected}
                        onChange={() =>
                          checkboxChangeHanlder(cartItem.productId)
                        }
                      />
                      <label htmlFor={`checkbox${cartItem.productId}`} />

                      <S.Image src={`${cartItem.img}`}></S.Image>

                      <div className="titleWrapper">
                        <div className="title">{cartItem.title}</div>
                      </div>

                      <div className="circleArea">
                        <div
                          className="circle"
                          onClick={() =>
                            decreaseQuantityHandler(cartItem.productId)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clipRule="evenodd"
                              d="M1.7998 6.0001C1.7998 5.89401 1.84195 5.79227 1.91696 5.71726C1.99198 5.64224 2.09372 5.6001 2.1998 5.6001H9.79981C9.90589 5.6001 10.0076 5.64224 10.0826 5.71726C10.1577 5.79227 10.1998 5.89401 10.1998 6.0001C10.1998 6.10618 10.1577 6.20793 10.0826 6.28294C10.0076 6.35795 9.90589 6.4001 9.79981 6.4001H2.1998C2.09372 6.4001 1.99198 6.35795 1.91696 6.28294C1.84195 6.20793 1.7998 6.10618 1.7998 6.0001Z"
                              fill="#999999"
                            />
                          </svg>
                        </div>
                        <div>{cartItem.quantity}</div>
                        <div
                          className="circle"
                          onClick={() =>
                            increaseQuantityHandler(cartItem.productId)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clipRule="evenodd"
                              d="M6.39981 2.20005C6.39981 2.09396 6.35766 1.99222 6.28265 1.91721C6.20763 1.84219 6.10589 1.80005 5.9998 1.80005C5.89372 1.80005 5.79198 1.84219 5.71696 1.91721C5.64195 1.99222 5.59981 2.09396 5.59981 2.20005V5.60005H2.1998C2.09372 5.60005 1.99198 5.64219 1.91696 5.71721C1.84195 5.79222 1.7998 5.89396 1.7998 6.00005C1.7998 6.10614 1.84195 6.20788 1.91696 6.28289C1.99198 6.35791 2.09372 6.40005 2.1998 6.40005H5.59981V9.80005C5.59981 9.90614 5.64195 10.0079 5.71696 10.0829C5.79198 10.1579 5.89372 10.2 5.9998 10.2C6.10589 10.2 6.20763 10.1579 6.28265 10.0829C6.35766 10.0079 6.39981 9.90614 6.39981 9.80005V6.40005H9.79981C9.90589 6.40005 10.0076 6.35791 10.0826 6.28289C10.1577 6.20788 10.1998 6.10614 10.1998 6.00005C10.1998 5.89396 10.1577 5.79222 10.0826 5.71721C10.0076 5.64219 9.90589 5.60005 9.79981 5.60005H6.39981V2.20005Z"
                              fill="#999999"
                            />
                          </svg>
                        </div>
                      </div>
                    </>
                    <div className="productprice">
                      {cartItem.price.toLocaleString()}원
                    </div>
                  </S.CartWrapper>
                ))}
                <S.DeleteButton
                  onClick={removeSelectedItemsHandler}
                  disabled={selectedItems.length === 0}
                >
                  삭제하기
                </S.DeleteButton>
              </S.CartList>

              <S.TotalAmount>
                <div>
                  <div className="div1">상품금액</div>
                  <div className="div2">{selectedTotalPrice.toString()}원</div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M2.3999 7.32212C2.3999 7.19266 2.45609 7.0685 2.55611 6.97696C2.65613 6.88541 2.79179 6.83398 2.93324 6.83398H13.0666C13.208 6.83398 13.3437 6.88541 13.4437 6.97696C13.5437 7.0685 13.5999 7.19266 13.5999 7.32212C13.5999 7.45158 13.5437 7.57574 13.4437 7.66728C13.3437 7.75883 13.208 7.81026 13.0666 7.81026H2.93324C2.79179 7.81026 2.65613 7.75883 2.55611 7.66728C2.45609 7.57574 2.3999 7.45158 2.3999 7.32212Z"
                    fill="#999999"
                  />
                </svg>
                <div>
                  <div className="div1">할인금액</div>
                  <div className="div2">0원</div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M8.53324 2.93324C8.53324 2.79179 8.47705 2.65613 8.37703 2.55611C8.27701 2.45609 8.14135 2.3999 7.9999 2.3999C7.85845 2.3999 7.7228 2.45609 7.62278 2.55611C7.52276 2.65613 7.46657 2.79179 7.46657 2.93324V7.46657H2.93324C2.79179 7.46657 2.65613 7.52276 2.55611 7.62278C2.45609 7.7228 2.3999 7.85845 2.3999 7.9999C2.3999 8.14135 2.45609 8.27701 2.55611 8.37703C2.65613 8.47705 2.79179 8.53324 2.93324 8.53324H7.46657V13.0666C7.46657 13.208 7.52276 13.3437 7.62278 13.4437C7.7228 13.5437 7.85845 13.5999 7.9999 13.5999C8.14135 13.5999 8.27701 13.5437 8.37703 13.4437C8.47705 13.3437 8.53324 13.208 8.53324 13.0666V8.53324H13.0666C13.208 8.53324 13.3437 8.47705 13.4437 8.37703C13.5437 8.27701 13.5999 8.14135 13.5999 7.9999C13.5999 7.85845 13.5437 7.7228 13.4437 7.62278C13.3437 7.52276 13.208 7.46657 13.0666 7.46657H8.53324V2.93324Z"
                    fill="#999999"
                  />
                </svg>
                <div>
                  <div className="div1">배송비</div>
                  <div className="div2">{shippingCost.toString()}원</div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M14.25 10C14.25 10.1989 14.171 10.3897 14.0303 10.5303C13.8897 10.671 13.6989 10.75 13.5 10.75H2.5C2.30109 10.75 2.11032 10.671 1.96967 10.5303C1.82902 10.3897 1.75 10.1989 1.75 10C1.75 9.80109 1.82902 9.61032 1.96967 9.46967C2.11032 9.32902 2.30109 9.25 2.5 9.25H13.5C13.6989 9.25 13.8897 9.32902 14.0303 9.46967C14.171 9.61032 14.25 9.80109 14.25 10ZM2.5 6.75H13.5C13.6989 6.75 13.8897 6.67098 14.0303 6.53033C14.171 6.38968 14.25 6.19891 14.25 6C14.25 5.80109 14.171 5.61032 14.0303 5.46967C13.8897 5.32902 13.6989 5.25 13.5 5.25H2.5C2.30109 5.25 2.11032 5.32902 1.96967 5.46967C1.82902 5.61032 1.75 5.80109 1.75 6C1.75 6.19891 1.82902 6.38968 1.96967 6.53033C2.11032 6.67098 2.30109 6.75 2.5 6.75Z"
                    fill="#999999"
                  />
                </svg>
                <div>
                  <div className="div1">주문금액</div>
                  <div className="div2">{totalPayment.toString()}원</div>
                </div>
              </S.TotalAmount>
            </S.LeftContainer>
            <S.RightContainer>
              <S.PaymentInfo>결제정보</S.PaymentInfo>
              <S.BoxWrapper>
                <S.Box>
                  <h3>상품수</h3>
                  <span>{cartList.length}개</span>
                </S.Box>
                <S.Box>
                  <h3>상품금액</h3>
                  <span>{selectedTotalPrice.toString()}원</span>
                </S.Box>
                <S.Box>
                  <h3>배송비</h3>
                  <span>{shippingCost.toString()}원</span>
                </S.Box>
                <S.Box>
                  <h2>
                    총 결제 금액 <span>{totalPayment.toString()}원</span>
                  </h2>
                </S.Box>
              </S.BoxWrapper>
              <S.PaymentButton
                onClick={paymentHandeler}
                disabled={selectedItems.length === 0}
              >
                결제하기
              </S.PaymentButton>
              <br></br>
            </S.RightContainer>
          </S.Wrapper>
        </S.Cart>
      )}
    </S.CartContainer>
  );
};

export default CartPage;
