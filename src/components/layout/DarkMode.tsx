import React, { useState } from 'react';
import * as S from '../../styledComponent/styledLayout/StDarkMode';
import { useDarkMode } from 'hooks/useDarkMode';
import { useSelector } from 'react-redux';

interface darkModeState {
  darkMode: boolean;
}
const DarkMode = () => {
  const { toggleDarkMode } = useDarkMode();
  const { darkMode } = useSelector(
    (state: { darkModeSlice: darkModeState }) => state.darkModeSlice,
  );
  return (
    <S.DarkeModeButton $darkMode={darkMode} onClick={toggleDarkMode}>
      {darkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M16 5.33341V2.66675M16 29.3334V26.6667M26.6667 16.0001H29.3334M2.66669 16.0001H5.33335M23.5427 8.45741L25.4267 6.57341M6.57335 25.4267L8.45869 23.5414M8.45869 8.45608L6.57335 6.57341M25.4267 25.4267L23.5414 23.5414M16 22.6667C17.7681 22.6667 19.4638 21.9644 20.7141 20.7141C21.9643 19.4639 22.6667 17.7682 22.6667 16.0001C22.6667 14.232 21.9643 12.5363 20.7141 11.286C19.4638 10.0358 17.7681 9.33341 16 9.33341C14.2319 9.33341 12.5362 10.0358 11.286 11.286C10.0357 12.5363 9.33335 14.232 9.33335 16.0001C9.33335 17.7682 10.0357 19.4639 11.286 20.7141C12.5362 21.9644 14.2319 22.6667 16 22.6667Z"
            stroke="#5B5B5B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M24.3302 14.5853C23.4354 14.823 22.5134 14.9432 21.5875 14.9431C18.7682 14.9431 16.1205 13.8471 14.1318 11.8584C12.8258 10.5449 11.887 8.9121 11.4087 7.12269C10.9305 5.33328 10.9296 3.44978 11.4062 1.65993C11.4657 1.43614 11.4653 1.20063 11.4051 0.97704C11.3449 0.753445 11.2269 0.54962 11.063 0.386012C10.8992 0.222404 10.6951 0.104765 10.4714 0.0448966C10.2478 -0.014972 10.0122 -0.0149654 9.78856 0.0449158C7.54783 0.642038 5.50351 1.81789 3.86069 3.45453C-1.28674 8.60196 -1.28674 16.9807 3.86069 22.1308C5.0842 23.3611 6.53957 24.3366 8.14257 25.0007C9.74557 25.6649 11.4644 26.0045 13.1995 26C14.9342 26.0048 16.6525 25.6655 18.2551 25.0015C19.8577 24.3376 21.3126 23.3623 22.5356 22.1321C24.1735 20.489 25.3499 18.4436 25.9466 16.2016C26.0058 15.9779 26.0054 15.7426 25.9452 15.5191C25.8849 15.2957 25.7671 15.092 25.6035 14.9283C25.4399 14.7647 25.2362 14.6469 25.0127 14.5867C24.7893 14.5265 24.5539 14.526 24.3302 14.5853ZM20.6697 20.2649C19.6912 21.2488 18.5272 22.0289 17.2452 22.56C15.9631 23.0911 14.5885 23.3626 13.2008 23.3589C11.8127 23.3623 10.4376 23.0906 9.15513 22.5593C7.87267 22.028 6.70826 21.2477 5.72925 20.2636C1.61183 16.1448 1.61183 9.44181 5.72925 5.32308C6.52487 4.52834 7.44342 3.86708 8.44954 3.36473C8.30227 5.26505 8.567 7.17477 9.22565 8.96337C9.8843 10.752 10.9213 12.3773 12.2659 13.7283C13.6139 15.077 15.2387 16.1169 17.0281 16.7761C18.8174 17.4352 20.7286 17.6979 22.6294 17.5459C22.1243 18.5503 21.4629 19.4681 20.6697 20.2649Z"
            fill="#585858"
          />
        </svg>
      )}
    </S.DarkeModeButton>
  );
};

export default DarkMode;
