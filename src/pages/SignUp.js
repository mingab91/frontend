import React,{useEffect, useState} from 'react';
import { useDispatch,useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from 'styled-components';
import { checkValue } from "../shared/regExp";
import {checkgray, checkgray2} from '../image'

const SignUp = (props) => {
    const dispatch = useDispatch();
    const [admin, setAdmin] = useState(false);
    const [passwordcheck, setPasswordcheck] = useState("");
    const [emaildisplay,setEmailDisplay] = useState("block");
    const [passworddisplay,setPasswordDisplay] = useState("none");
    const [termsdisplay,setTermsDisplay] = useState("none");
    const [telecomdisplay,setTelecomDisplay]= useState("none");
    const [carddisplay,setCardDisplay] = useState("none");
    const [typedisplay,setTypeDisplay] = useState("none");
    const [telecom,setTelecom] = useState("");
    const [cardtype,setCardtype] = useState("");
    const [type1,setType1] = useState("");
    const [type2,setType2] = useState("");
    const [type3,setType3] = useState("");
    const [signup_info, setSignUp_Info] = useState({
        email: "",
        username: "",
        password: "",
        password1: "",
        admintoken:""
    });

    const cards = [
        {
            card_id:0,
            card_name:"신한카드"
        },
        {
            card_id:1,
            card_name:"현대카드"
        },
        {
            card_id:2,
            card_name:"삼성카드"
        },
        {
            card_id:3,
            card_name:"국민카드"
        },
        {
            card_id:4,
            card_name:"롯데카드"
        },
        {
            card_id:5,
            card_name:"하나카드"
        },
        {
            card_id:6,
            card_name:"우리카드"
        },
        {
            card_id:7,
            card_name:"농협카드"
        },
        {
            card_id:8,
            card_name:"씨티카드"
        },
        {
            card_id:9,
            card_name:"BC카드"
        },
        {
            card_id:10,
            card_name:"토스카드"
        },
        {
            card_id:11,
            card_name:"카카오카드"
        },
    ]

    const interests = [
        {
            inter_id:0,
            inter_type:"카페,디저트"
        },
        {
            inter_id:1,
            inter_type:"음식점"
        },
        {
            inter_id:2,
            inter_type:"패스트푸드"
        },
        {
            inter_id:3,
            inter_type:"편의점,마트"
        },
        {
            inter_id:4,
            inter_type:"뷰티,미용"
        },
        {
            inter_id:5,
            inter_type:"패션"
        },
        {
            inter_id:6,
            inter_type:"건강,스포츠"
        },
        {
            inter_id:7,
            inter_type:"여행,숙박"
        },
        {
            inter_id:8,
            inter_type:"문화"
        },
        {
            inter_id:9,
            inter_type:"가전,디지털"
        },
        {
            inter_id:10,
            inter_type:"가구,생활"
        },
        {
            inter_id:11,
            inter_type:"쇼핑,잡화"
        },
    ]

    const onChange = (e) => {
        setSignUp_Info({...signup_info, [e.target.name]: e.target.value});
    }

    const {email, username, password, password1, admintoken} = signup_info;

    const signup = () => {
        const user_info = {
            userEmail: email,
            password: password,
            nickname:username,
            telecom:telecom,
            cardType:cardtype,
            type1:type1,
            type2:type2,
            type3:type3,
            admin:admin,
            adminToken:admintoken
        }
        dispatch(userActions.signupFB(user_info))
    };

    const admincheck = () => {
        if(admin === false){
            setAdmin(true);
        }else{
            setAdmin(false)
        }
    }

    const telecomtypeselect = (e) =>{
        console.log(e.target.value)
        if(e.target.value === telecom){
            setTelecom("")
        }else{
            setTelecom(e.target.value);
        }
    };

    const cardtypetypeselect = (e) => {
        if(e.target.value === cardtype){
            setCardtype("")
        }else{
            setCardtype(e.target.value);
        }
    }

    const typeselect = (e) => {
        console.log(type1)
        console.log(type2)
        console.log(type3)
        if(type1 === "" && type2 === "" && type3 === ""){
            setType1(e.target.value);
        }

        if(type1 && type2 === "" && type3 === ""){
            setType2(e.target.value);
        }

        if(type1 === "" && type2 && type3 === ""){
            setType1(e.target.value);
        }

        if(type1 === "" && type2 === "" && type3){
            setType1(e.target.value);
        }  

        if(type1 === "" && type2 && type3){
            setType1(e.target.value);
        }
        
        if(type1 && type2 === "" && type3){
            setType2(e.target.value);
        }
        
        if(type1 && type2 && type3 === ""){
            setType3(e.target.value);
        }
    }

    const typecancle = (e) => {
        if(e.target.value === type1){
            setType1("");
        }
        if(e.target.value === type2){
            setType2("");
        }
        if(e.target.value === type3){
            setType3("");
        }
    }

    const next = () => {
        if(emaildisplay === "block"){
            setEmailDisplay("none");
            setPasswordDisplay("block");
        }else if(passworddisplay === "block"){
            setPasswordDisplay("none");
            setTermsDisplay("block");
        }else if(termsdisplay === "block"){
            setTermsDisplay("none");
            setTelecomDisplay("block");
        }else if(telecomdisplay ==="block"){
            setTelecomDisplay("none");
            setCardDisplay("block");
        }else if(carddisplay==="block"){
            setCardDisplay("none");
            setTypeDisplay("block");
        }
    };

    useEffect(()=> {
        if(password !== password1){
            setPasswordcheck("비밀번호가 일치하지 않습니다.")
            return
        }else{
            setPasswordcheck("비밀번호가 일치합니다")
            return
        }
    },[password, password1]);

    return (
        <React.Fragment>
            <EmailBox display={emaildisplay} bgcolor={email?"orange":"gray"}>
                <p>이메일을 입력해주세요.</p>
                <input type="text" name="email" value={email} onChange={onChange}/>
                <div>
                    <button onClick={next} >다음</button>
                </div>
            </EmailBox>
            <PasswordBox display={passworddisplay} bgcolor={password1?"orange":"gray"}>
                <p>비밀번호</p>
                <input type="password" name="password" value={password} onChange={onChange}/>
                <p>비밀번호확인</p>
                <input type="password" name="password1" value={password1} onChange={onChange}/>
                <p>{passwordcheck}</p>
                <div>
                    <button onClick={next}>다음</button>
                </div>
            </PasswordBox>
            <TermsBox display={termsdisplay}>
                <p>서비스 약관을 확인해주세요.</p>
                <div className="allcheck">
                    <div>
                        <img src={checkgray}/>
                        <span>모두 동의</span>
                    </div>
                </div>
                <div className="checklist">
                    <ul>
                        <li>
                            <img src={checkgray2}/>
                            <span>[필수] 만 14세 이상</span>
                        </li>
                        <li>
                            <img src={checkgray2}/>
                            <span>[필수] 이용약관 동의</span>
                        </li>
                        <li>
                            <img src={checkgray2}/>
                            <span>[필수] 개인정보 처리방침 동의</span>
                        </li>
                        <li>
                            <img src={checkgray2}/>
                            <span>[선택] 광고성 정보 수신 및 마케팅 활용 동의</span>
                        </li>
                    </ul>
                </div>
                <div className="nextbutton">
                    <button onClick={next}>다음</button>
                </div>
            </TermsBox>
            <TelecomBox display={telecomdisplay} bgcolor={telecom?"orange":"gray"}>
                <p>통신사를 선택해주세요.</p>
                <div>
                    {telecom==="SKT"?(<button className="telecomcancel" value="SKT" onClick={telecomtypeselect}>SKT</button>):(<button className="telecomselect" value="SKT" onClick={telecomtypeselect}>SKT</button>)}
                    {telecom==="KT"?(<button className="telecomcancel" value="KT" onClick={telecomtypeselect}>KT</button>):(<button className="telecomselect" value="KT" onClick={telecomtypeselect}>KT</button>)}
                    {telecom==="LG"?(<button className="telecomcancel" value="LG" onClick={telecomtypeselect}>LG</button>):(<button className="telecomselect" value="LG" onClick={telecomtypeselect}>LG</button>)}
                </div>
                <div className="nextbutton">
                    <button onClick={next} >다음</button>
                </div>
            </TelecomBox>
            <CardtypeBox display={carddisplay} bgcolor={cardtype?"orange":"gray"}>
                <p>카드사를 선택해주세요.</p>
                <div>
                    {cards.map((card) => {
                        if(cardtype === card.card_name){
                            return(
                                <button className="cardtypecancel" value={card.card_name} onClick={cardtypetypeselect}>{card.card_name}</button>
                            )
                        }else{
                            return(
                                <button className="cardtypeselect" value={card.card_name} onClick={cardtypetypeselect}>{card.card_name}</button>
                            )
                        }
                    })}
                </div>
                <div className="nextbutton">
                    <button onClick={next} >다음</button>
                </div>
            </CardtypeBox>
            <TypeBox display={typedisplay} bgcolor={type1?"orange":"gray"}>
                <p>관심사를 선택해주세요.(최대 3개)</p>
                <div>
                    {interests.map((interest) => {
                        if(type1 !== interest.inter_type && type2 !== interest.inter_type && type3 !== interest.inter_type){
                            return(
                                <button className="intertypeselect" onClick={typeselect} value={interest.inter_type}>{interest.inter_type}</button>
                            )
                        }else{
                            return(
                                <button className="intertypecancel" onClick={typecancle} value={interest.inter_type}>{interest.inter_type}</button>
                            )
                        }
                    })}
                </div>
            </TypeBox>
        </React.Fragment>
    );
};

const TypeBox = styled.div`
    display: ${props => props.display};
    p{
        font-weight: bold;
    }
    div{
        display:flex;
        margin: 0 auto;
        width: 375px;
        flex-wrap: wrap;
        justify-content:space-evenly;
        padding-left:0px;

        .intertypeselect{
            color: grey;
            margin-bottom: 15px;
            border: none;
            width:99px;
            height:99px;
            border-radius: 5px;
            background-color: white;
            border: solid 1px grey;
        }
        .intertypecancel{
            color: orange;
            margin-bottom: 15px;
            border: none;
            width:99px;
            height:99px;
            border-radius: 5px;
            background-color: white;
            border: solid 1px orange;
        }
        
    }
`;


const TermsBox = styled.div`
    margin-left: 15px;
    display: ${props => props.display};
    p{
        font-weight: bold;
    }
    .allcheck{
        border-bottom: solid 1px grey;
        width: 328px;
        div{
            display:flex;
            align-items: center;
            margin-bottom:10px;
            span{
                font-size: 13px;
                margin-left: 5px;
                color:grey;
            }
        }
    }
    
    .checklist{
        ul{
            margin-left:-20px;
            list-style:none;
            li{
                margin-bottom:10px;
                span{
                    margin-left:10px;
                    color:grey;
                    font-size: 13px;
                }
            }
        }
    }

    .nextbutton{
        margin-top: 200px;
        button{
            border-radius: 5px;
            border:none;
            width:328px;
            height:45px;
            color: white;
            background-color:${props => props.bgcolor};
        }
    }
`;


const EmailBox = styled.div`
    margin-left: 15px;
    display: ${props => props.display};

    p{
        font-weight: bold;
    }

    input{
        width: 328px;
        height: 37px;
        border-radius: 5px;
        border:1px solid #D5D5D5;
    }

    div{
        margin-top: 200px;
        button{
            border-radius: 5px;
            border:none;
            width:328px;
            height:45px;
            color: white;
            background-color:${props => props.bgcolor};
        }
    }
    
`;


const PasswordBox = styled.div`
    margin-left: 15px;
    display: ${props => props.display};
    p{
        font-weight: bold;
    }

    input{
        width: 328px;
        height: 37px;
        border-radius: 5px;
        border:1px solid #D5D5D5;
    }

    div{
        margin-top: 200px;
        button{
            border-radius: 5px;
            border:none;
            width:328px;
            height:45px;
            color: white;
            background-color:${props => props.bgcolor};
        }
    }
`;



const TelecomBox = styled.div`
    display: ${props => props.display};
    p{
        font-weight: bold;
    }
    div{
        display:flex;
        margin: 0 auto;
        width: 375px;
        flex-wrap: wrap;
        justify-content:space-evenly;
        padding-left:0px;

        .telecomselect{
            color: grey;
            margin-bottom: 15px;
            border: none;
            width:99px;
            height:99px;
            border-radius: 5px;
            background-color: white;
            border: solid 1px grey;
        }
        .telecomcancel{
            color: orange;
            margin-bottom: 15px;
            border: none;
            width:99px;
            height:99px;
            border-radius: 5px;
            background-color: white;
            border: solid 1px orange;
        }
        
    }

    .nextbutton{
        margin-top: 200px;
        button{
            border-radius: 5px;
            border:none;
            width:328px;
            height:45px;
            color: white;
            background-color:${props => props.bgcolor};
        }
    }
`;

const CardtypeBox = styled.div`
    display: ${props => props.display};
    p{
        font-weight: bold;
    }
    div{
        display:flex;
        margin: 0 auto;
        width: 375px;
        flex-wrap: wrap;
        justify-content:space-evenly;
        padding-left:0px;

        .cardtypeselect{
            color: grey;
            margin-bottom: 15px;
            border: none;
            width:99px;
            height:99px;
            border-radius: 5px;
            background-color: white;
            border: solid 1px grey;
        }
        .cardtypecancel{
            color: orange;
            margin-bottom: 15px;
            border: none;
            width:99px;
            height:99px;
            border-radius: 5px;
            background-color: white;
            border: solid 1px orange;
        }
        
    }

    .nextbutton{
        margin-top: 40px;
        button{
            border-radius: 5px;
            border:none;
            width:328px;
            height:45px;
            color: white;
            background-color:${props => props.bgcolor};
        }
    }
`;



export default SignUp;