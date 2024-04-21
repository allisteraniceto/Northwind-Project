
import Star from "../components/Star";
import { useState } from "react";
import "../styles/StarRanking.css";

interface Props {
  formType: String;
  readOnlyStarRanking: Boolean;
}


export default function StarRanking({ formType, readOnlyStarRanking}: Props) {

  const [rating1, setRating1] = useState(0);

  const childToParent1 = (childData1:number) => {
    setRating1(childData1);
  }

  const [rating2, setRating2] = useState(0);

  const childToParent2 = (childData2:number) => {
    setRating2(childData2);
  }

  const [rating3, setRating3] = useState(0);

  const childToParent3 = (childData3:number) => {
    setRating3(childData3);
  }

  const [rating4, setRating4] = useState(0);

  const childToParent4 = (childData4:number) => {
    setRating4(childData4);
  }

  const [rating5, setRating5] = useState(0);

  const childToParent5 = (childData5:number) => {
    setRating5(childData5);
  }

  const [rating6, setRating6] = useState(0);

  const childToParent6 = (childData6:number) => {
    setRating6(childData6);
  }

  const [rating7, setRating7] = useState(0);

  const childToParent7 = (childData7:number) => {
    setRating7(childData7);
  }

  const [rating8, setRating8] = useState(0);
   
  const childToParent8 = (childData8:number) => {
    setRating8(childData8);
  }

  const [rating9, setRating9] = useState(0);
   
  const childToParent9 = (childData9:number) => {
    setRating9(childData9);
  }

  const [rating10, setRating10] = useState(0);
   
  const childToParent10 = (childData10:number) => {
    setRating10(childData10);
  }

  const [rating11, setRating11] = useState(0);
   
  const childToParent11 = (childData11:number) => {
    setRating11(childData11);
  }

  const [rating12, setRating12] = useState(0);
   
  const childToParent12 = (childData12:number) => {
    setRating12(childData12);
  }

  const [rating13, setRating13] = useState(0);
   
  const childToParent13 = (childData13:number) => {
    setRating13(childData13);
  }

  const [rating14, setRating14] = useState(0);
   
  const childToParent14 = (childData14:number) => {
    setRating14(childData14);
  }

  const [rating15, setRating15] = useState(0);
   
  const childToParent15 = (childData15:number) => {
    setRating15(childData15);
  }

  const [rating16, setRating16] = useState(0);
   
  const childToParent16 = (childData16:number) => {
    setRating16(childData16);
  }

  return (
    <>
      <nav className="starRanking">
      <p style={{ fontWeight: 'bold' }}><>&nbsp; </>Employee Ratings<>&nbsp; </><>&nbsp; </><>&nbsp; </>Manager Ratings</p>
      <nav className="starScroll">
      <nav className="subratings">
        <Star formType={String(formType)} questionNum = {1} category="Growth Mindset" readOnlyStar={readOnlyStarRanking} childToParent={childToParent1} key="id1"></Star>
        <Star formType={String(formType)} questionNum = {2} category="Technical Acumen" readOnlyStar={readOnlyStarRanking} childToParent={childToParent2} key="id2"></Star>
        <Star formType={String(formType)} questionNum = {3} category="Work Quality" readOnlyStar={readOnlyStarRanking} childToParent={childToParent3} key="id3"></Star>
        <Star
          formType={String(formType)}
          questionNum = {4}
          category="Collaboration/ Teamwork"
          readOnlyStar={readOnlyStarRanking}
          childToParent={childToParent4}
          key="id4"
        ></Star>
        <Star formType={String(formType)} questionNum = {5} category="Creativity" readOnlyStar={readOnlyStarRanking} childToParent={childToParent5} key="id5"></Star>
        <Star formType={String(formType)} questionNum = {6} category="Initiative" readOnlyStar={readOnlyStarRanking} childToParent={childToParent6} key="id6"></Star>
        <Star
          formType={String(formType)}
          questionNum = {7}
          category="Customer Orientation"
          readOnlyStar={readOnlyStarRanking}
          childToParent={childToParent7}
          key="id7"
        ></Star>
        <Star formType={String(formType)} questionNum = {8} category="Adaptability" readOnlyStar={readOnlyStarRanking} childToParent={childToParent8} key="id8"></Star>
        </nav>
        <nav className="subratings">
        <Star formType={String(formType)} questionNum = {1} category="Growth Mindset" readOnlyStar={!readOnlyStarRanking} childToParent={childToParent9} key="id9"></Star>
        <Star formType={String(formType)} questionNum = {2} category="Technical Acumen" readOnlyStar={!readOnlyStarRanking} childToParent={childToParent10} key="id10"></Star>
        <Star formType={String(formType)} questionNum = {3} category="Work Quality" readOnlyStar={!readOnlyStarRanking} childToParent={childToParent11} key="id11"></Star>
        <Star
          formType={String(formType)}
          questionNum = {4}
          category="Collaboration/ Teamwork"
          readOnlyStar={!readOnlyStarRanking}
          childToParent={childToParent12}
          key="id12"
        ></Star>
        <Star formType={String(formType)} questionNum = {5} category="Creativity" readOnlyStar={!readOnlyStarRanking} childToParent={childToParent13} key="id13"></Star>
        <Star formType={String(formType)} questionNum = {6} category="Initiative" readOnlyStar={!readOnlyStarRanking} childToParent={childToParent14} key="id14"></Star>
        <Star
          formType={String(formType)}
          questionNum = {7}
          category="Customer Orientation"
          readOnlyStar={!readOnlyStarRanking}
          childToParent={childToParent15}
          key="id15"
        ></Star>
        <Star formType={String(formType)} questionNum = {8} category="Adaptability" readOnlyStar={!readOnlyStarRanking} childToParent={childToParent16} key="id16"></Star>
        </nav>
        </nav>
        <nav className="bothTotals">
        <nav className = "totals">
        <p style={{ fontWeight: 'bold' }}><>&nbsp;</><>&nbsp;</><>&nbsp;</>Total Ratings: {rating1+rating2+rating3+rating4+rating5+rating6+rating7+rating8}</p>
        <p style={{ fontWeight: 'bold' }}><>&nbsp;</><>&nbsp;</><>&nbsp;</>Overall: {(rating1+rating2+rating3+rating4+rating5+rating6+rating7+rating8)/8}</p>
        </nav>
        <nav className = "totals">
        <p style={{ fontWeight: 'bold' }}><>&nbsp;</><>&nbsp;</><>&nbsp;</>Total Ratings: {rating9+rating10+rating11+rating12+rating13+rating14+rating15+rating16}</p>
        <p style={{ fontWeight: 'bold' }}><>&nbsp;</><>&nbsp;</><>&nbsp;</>Overall: {(rating9+rating10+rating11+rating12+rating13+rating14+rating15+rating16)/8}</p>
        </nav>
        </nav>
      </nav>
    </>
  );
}

