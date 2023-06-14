import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, CardGroup } from "react-bootstrap";
import ProductCard from "./productCard";
import RangeCard from "./rangeCard";
import GroupCard from "./groupCard";
import SlideShow from "./slideShow";
import { useState, useEffect } from "react";

const CategoryCollection = ({
  type,
  slideImages,
  collectionName,
  products,
  groups,
  headerColor,
  textColor,
  groupSize = 12, // default group size is 12
}) => {
  const [numCols, setNumCols] = useState(6);

  const groupsCount = Math.ceil(groups.length / groupSize);
  const groupsArr = Array.from({ length: groupsCount }, (_, i) =>
    groups.slice(i * groupSize, (i + 1) * groupSize)
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768 && window.innerWidth <= 1200) {
        setNumCols(5);
      } else {
        setNumCols(6);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {groupsArr.map((group, index) => (
        // <Card key={index} className="collection">
        //   {index === 0 && (
        //     <Card.Header
        //       as="h5"
        //       className="collection__h--center"
        //       style={{ backgroundColor: headerColor, color: textColor }}
        //     >
        //       {collectionName}
        //     </Card.Header>
        //   )}
        //   <Card.Body className="collection__body">
        //     <CardGroup>
        //       <Row xs={2} md={numCols} className="g-2">
        //         {group.slice(0, numCols*2).map((deal, index) => {
        //           return <GroupCard key={index} {...deal} />;
        //         })}
        //       </Row>
        //     </CardGroup>
        //   </Card.Body>
        // </Card>

        <div key={index} className="groups">
          {index === 0 && (
            <div className="groups__header">
              <h4 className="groups__text">{collectionName}</h4>
            </div>
          )}

          <div className="groups__body">
            {group.slice(0, numCols * 2).map((deal, index) => {
              return <GroupCard key={index} {...deal} />;
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryCollection;
