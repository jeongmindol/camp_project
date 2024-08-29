import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import ModalItem from "../items/ModalItem";
import { useDispatch, useSelector } from "react-redux";
import { closeModalItem } from "../../redux/slices/ModalItemSlice";
import KakaoMap from "../KakaoMap";
import { fetchGetItemsData } from "../../redux/slices/apiSlice";

const Index = () => {
  // const [data, setData] = useState(null);
  const [isModalItemOpen, setIsModalItemOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedAreas, setSelectedAreas] = useState(null); // 추가된 상태

  const dispatch = useDispatch();
  const areasData = useSelector((state) => state.api.getItemData);

  useEffect(() => {
    dispatch(fetchGetItemsData()); // 데이터 fetch
  }, [dispatch]);

  const handleRegionClick = (regionName) => {
    console.log("Region name in handleRegionClick:", regionName);
    setSelectedRegion(regionName);

    if (areasData) {
      const selectedAreas = areasData.find((area) =>
        area.addr1.includes(regionName)
      );
      setSelectedAreas(selectedAreas); // 선택된 areas 설정
    }
    setIsModalItemOpen(true);
  };

  const handleCloseModalItem = () => {
    setIsModalItemOpen(false);
    setSelectedRegion(null);
    setSelectedAreas(null);
  };

  return (
    <div className="page-section">
      <Navbar />
      <div className="w-[80%] h-full flex flex-col justify-center items-center">
        <h2 className="text-3xl mb-5">원하시는 지역을 선택해 주세요</h2>
        {/* <Map /> */}
        <KakaoMap onRegionClick={handleRegionClick} />
      </div>
      {isModalItemOpen && (
        <ModalItem
          onClose={handleCloseModalItem}
          selectedRegion={selectedRegion}
          areas={selectedAreas}
        />
      )}
      {/* <ModalItem /> */}
    </div>
  );
};

export default Index;
