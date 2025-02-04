import styled from "styled-components";

export const HomeWrapper = styled.div`
  margin: 0 auto;
  max-width: 1232px;
  padding: 16px;

  /* ${(props) =>
    props.isFull &&
    `
  margin-left: 0;
  `} */
`;

export const Carousel = styled.div`
  display: block;
  height: 600px;
  width: 100%;
  margin-top: 16px;
  background-color: aliceblue;
`;

export const CarouselImg1 = styled.div`
  width: 100%;
  height: 600px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("https://cdn.tgdd.vn/Files/2019/07/14/1179456/chiec-dong-ho-cua-trinh-xuan-thanh.jpg");
`;
export const CarouselImg2 = styled.div`
  width: 100%;
  height: 600px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("https://cdn.tgdd.vn/Files/2019/07/14/1179456/6.jpg");
`;
export const CarouselImg3 = styled.div`
  width: 100%;
  height: 600px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("https://cdn.tgdd.vn/Files/2019/07/14/1179456/image-top.jpg");
`;
export const CarouselImg4 = styled.div`
  width: 100%;
  height: 600px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("https://bizweb.dktcdn.net/100/022/676/collections/dong-ho-nam-dep-hot-nhat-thoi-trang-gia-re-moi-nhat-2021-timesstore-vn.jpg?v=1619024777520");
`;

export const CardItem = styled.div`
  position: relative;
`;

export const CardImg = styled.div`
  padding-top: 150%;
  position: relative;
`;

export const CardContent = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
