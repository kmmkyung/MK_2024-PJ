import styled from'styled-components'

const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.color.footerColor };
  color: #ccc;
  z-index: 2;
`;

const FooterWrapper = styled.div`
  padding: 40px;
`;

const Logo = styled.div`
  text-align: center;

  img {  
    width: 80px;
  }
`;

const InfoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: min(2vw, 20px);
  justify-content: center;
  margin: 40px 0;

  li {
    font-size: ${props => props.theme.fontSize.s};
  }
`;

const CopyRight = styled.p`
  text-align: center;
  font-size: ${props => props.theme.fontSize.s};
  margin: 40px 0 30px;
`;

const Address = styled.address`
  font-style: normal;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.s};

  span{
    margin-top: 10px;
  }

  span:not(:last-child) {
    display: inline-block;
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid #ccc;
  }
`;

function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>
          <img alt='Disney Plus Logo' src='/svg/disney-color.svg'/>
        </Logo>
        <InfoList>
          <li>디즈니+ 이용 약관</li>
          <li>디즈니 이용 약관</li>
          <li>취소 및 환불 정책</li>
          <li>사업자 정보</li>
          <li>청소년 보호 정책</li>
          <li>개인정보 수집 및 이용</li>
          <li>개인정보의 제3자 제공 및 국외 이전</li>
          <li>개인정보 처리방침</li>
          <li>개인정보 처리방침 부속서</li>
          <li>관심 기반 광고</li>
          <li>고객센터</li>
          <li>지원되는 기기</li>
          <li>디즈니+ 소개</li>
        </InfoList>
        <CopyRight>© { year } Disney and its related entities. All Rights Reserved.</CopyRight>
        <Address>
          <span>월트디즈니컴퍼니코리아 유한책임회사</span>
          <span>대표자: 김소연</span>
          <span>서울시 강남구 테헤란로 152 7층 06236</span>
          <span>전화번호: 080-822-1416</span>
          <span>Email: help@disneyplus.kr</span>
          <span>사업자등록번호: 220-81-03347</span>
          <span>통신판매업 신고번호: 제2021-서울강남-05456호</span>
          <span>비디오물배급업신고번호: 제 2016-16호</span>
          <span>호스팅 서비스 제공업체: NSOne</span>
        </Address>
      </FooterWrapper>
    </FooterContainer>
  )
}

export default Footer;