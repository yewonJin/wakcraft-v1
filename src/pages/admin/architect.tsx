import styled from "styled-components";

const Container = styled.div`
   width: 1200px;
   margin: 0px auto;
   padding-top: 100px;
`;

const Title = styled.h2`
    margin-bottom: 20px;
`

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;

    > h3 {
        width: 180px;
        text-align: end;
    }
`

export default function Architect() {
    return (
        <Container>
            <form>
                <Title>건축가 추가</Title>
                <Wrapper>
                    <h3>마인크래프트 아이디</h3>
                    <input/>
                </Wrapper>
                <Wrapper>
                    <h3>왁물원 아이디</h3>
                    <input/>
                </Wrapper>
                <Wrapper>
                    <h3>티어</h3>
                    <select>
                        <option value="마카게">마카게</option>
                        <option value="오마카세">오마카세</option>
                        <option value="해커">해커</option>
                        <option value="해장국">해장국</option>
                        <option value="국밥">국밥</option>
                        <option value="미지근한 국밥">미지근한 국밥</option>
                        <option value="식은 국밥">식은 국빕</option>
                        <option value="프로">프로</option>
                        <option value="계추">계추</option>
                        <option value="계륵">계륵</option>
                        <option value="착한 눕">착한 눕</option>
                        <option value="안 나쁜 눕">안 나쁜 눕</option>
                        <option value="그냥 눕">그냥 눕</option>
                        <option value="진짜 눕">진짜 눕</option>
                        <option value="언랭">언랭</option>
                    </select>
                </Wrapper>
                <Wrapper>
                    <h3>눕프핵 정보 추가</h3>
                </Wrapper>
            </form>
        </Container>
    )
}